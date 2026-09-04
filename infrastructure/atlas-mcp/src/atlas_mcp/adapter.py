"""Private Splunk SDK connection boundary; no live operation is implemented."""

from dataclasses import dataclass
import ssl
import json
from typing import Final

import splunklib.client as splunk_client
from splunklib import binding

from .errors import AtlasMCPError

SEARCH_HEAD: Final = "atlas-search-head"
MANAGEMENT_PORT: Final = 8089


@dataclass(frozen=True, slots=True)
class SplunkAdapterBoundary:
    """Fixed connection boundary for future purpose-built adapter methods."""

    token: str
    tls_context: ssl.SSLContext
    timeout_seconds: int = 5

    def _connect(self) -> splunk_client.Service:
        """Keep the SDK service private to a future purpose-built adapter."""
        return splunk_client.connect(
            host=SEARCH_HEAD,
            port=MANAGEMENT_PORT,
            scheme="https",
            splunkToken=self.token,
            autologin=False,
            verify=True,
            context=self.tls_context,
            handler=binding.handler(
                timeout=self.timeout_seconds,
                verify=True,
                context=self.tls_context,
            ),
        )

    def get_server_info(self) -> dict[str, object]:
        """Perform only the fixed, single-entry server/info read."""

        try:
            response = self._connect().get("server/info", output_mode="json", count=1)
            payload = json.loads(response.body.read())
        except binding.AuthenticationError:
            raise AtlasMCPError.create("AUTHENTICATION_FAILED") from None
        except binding.HTTPError as error:
            status = getattr(error, "status", None)
            code = "AUTHENTICATION_FAILED" if status == 401 else "AUTHORIZATION_FAILED" if status == 403 else "UPSTREAM_UNAVAILABLE"
            raise AtlasMCPError.create(code) from None
        except TimeoutError:
            raise AtlasMCPError.create("UPSTREAM_TIMEOUT") from None
        except ssl.SSLError:
            raise AtlasMCPError.create("TLS_VERIFICATION_FAILED") from None
        except (json.JSONDecodeError, UnicodeError, TypeError, ValueError, KeyError):
            raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA") from None
        except OSError:
            raise AtlasMCPError.create("UPSTREAM_UNAVAILABLE") from None

        entries = payload.get("entry") if isinstance(payload, dict) else None
        if not isinstance(entries, list) or len(entries) != 1:
            raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA")
        entry = entries[0]
        content = entry.get("content") if isinstance(entry, dict) else None
        if not isinstance(content, dict):
            raise AtlasMCPError.create("MALFORMED_UPSTREAM_DATA")
        return content


__all__ = ["SplunkAdapterBoundary"]
