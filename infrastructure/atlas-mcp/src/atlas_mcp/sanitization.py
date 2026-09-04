"""Bounded normalization primitives for future approved evidence fields."""

import json
import unicodedata

from .errors import AtlasMCPError

MAX_STRING_CHARACTERS = 256
MAX_ARRAY_ITEMS = 8
MAX_SERIALIZED_BYTES = 8 * 1024


def sanitize_string(value: object) -> str | None:
    if value is None:
        return None
    if not isinstance(value, str):
        raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA")
    normalized = unicodedata.normalize("NFC", value)
    cleaned = "".join(
        character
        for character in normalized
        if unicodedata.category(character) != "Cc" or character in "\t\n\r"
    ).strip()
    if len(cleaned) > MAX_STRING_CHARACTERS:
        raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA")
    return cleaned


def sanitize_string_array(value: object) -> list[str] | None:
    if value is None:
        return None
    if not isinstance(value, list) or len(value) > MAX_ARRAY_ITEMS:
        raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA")
    sanitized = [sanitize_string(item) for item in value]
    if any(item is None for item in sanitized):
        raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA")
    return sorted(item for item in sanitized if item is not None)


def enforce_serialized_result_bound(result: dict[str, object]) -> None:
    try:
        encoded = json.dumps(result, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    except (TypeError, UnicodeError):
        raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA") from None
    if len(encoded) > MAX_SERIALIZED_BYTES:
        raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA")
