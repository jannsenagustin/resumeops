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


from . import CONTRACT_VERSION
from .tool import TOOL_NAME, get_server_info

# ATL-037 adds exactly the sole approved contract. Code existence alone never
# registers a tool; every production entry remains literal and reviewable.
PRODUCTION_REGISTRY = ExplicitToolRegistry(
    [ToolContract(TOOL_NAME, CONTRACT_VERSION, get_server_info)]
)
