# Networking Tools Roadmap

This track builds operational fluency with Linux and cross-platform networking utilities through fixture-driven drills. Start with `networking-tools/ip`: address JSON output, link state, default routes, and `ip route get` are the fastest way to understand how a host chooses an interface and source address.

Move through `ifconfig` and `ipconfig` to read legacy Linux and Windows output without confusing adapter names, loopback entries, gateways, DNS servers, or disconnected interfaces. Then use `ss`, DNS, ping, and traceroute drills to practice service listening state, resolver configuration, answer sections, hosts-file overrides, packet loss, and hop summaries.

The later drills focus on production-style diagnosis: `curl --write-out` timings, response headers, tcpdump line parsing, neighbor table states, nftables and iptables summaries, NetworkManager status, ethtool link speed/duplex, and sysctl forwarding flags. The checks use local text or JSON fixtures, so commands are deterministic and safe. After passing each drill, compare your parsing choices with the solution and think about which parts would break against real output variations.
