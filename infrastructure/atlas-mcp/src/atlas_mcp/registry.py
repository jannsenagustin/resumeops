"""Explicit tool registration and reject-by-default policy."""

from collections.abc import Callable, Iterable
from dataclasses import dataclass
from typing import Any

from .errors import AtlasMCPError

ToolHandler = Callable[[dict[str, object]], Any]


@dataclass(frozen=True, slots=True)
class ToolContract:
    name: str
    version: str
    handler: ToolHandler


class ExplicitToolRegistry:
    """A registry with no discovery, aliases, fallback, or implicit exposure."""

    def __init__(self, contracts: Iterable[ToolContract] = ()) -> None:
        self._contracts: dict[tuple[str, str], ToolContract] = {}
        for contract in contracts:
            key = (contract.name, contract.version)
            if key in self._contracts:
                raise ValueError("Duplicate explicit tool contract")
            self._contracts[key] = contract

    def names(self) -> tuple[str, ...]:
        return tuple(sorted(contract.name for contract in self._contracts.values()))

    def authorize(self, name: str, version: str) -> ToolContract:
        contract = self._contracts.get((name, version))
        if contract is None:
            raise AtlasMCPError.create("TOOL_NOT_REGISTERED")
        return contract


# ATL-036 intentionally exposes no live tool. ATL-037 must add the sole approved
# get_server_info contract explicitly; code existence alone can never register it.
PRODUCTION_REGISTRY = ExplicitToolRegistry()
