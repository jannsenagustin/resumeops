"""Private Splunk SDK connection boundary; no live operation is implemented."""

from dataclasses import dataclass
import ssl
from typing import Final

import splunklib.client as splunk_client

SEARCH_HEAD: Final = "atlas-search-head"
MANAGEMENT_PORT: Final = 8089


@dataclass(frozen=True, slots=True)
class SplunkAdapterBoundary:
    """Fixed connection boundary for future purpose-built adapter methods."""

    token: str
    tls_context: ssl.SSLContext

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
        )


__all__ = ["SplunkAdapterBoundary"]
