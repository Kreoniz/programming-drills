#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function text(strings, ...values) {
  const raw = strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
  const lines = raw.replace(/^\n/, "").replace(/\s+$/g, "").split("\n");
  const indents = lines.filter((line) => line.trim()).map((line) => line.match(/^\s*/)[0].length);
  const indent = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(indent)).join("\n") + "\n";
}

async function write(rel, body) {
  const full = path.join(root, rel);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, body);
}

async function writeJSON(rel, data) {
  await write(rel, `${JSON.stringify(data, null, 2)}\n`);
}

function theoryFor(ex) {
  return text`
    This drill practices ${ex.focus}. Networking tools are most useful when you can turn noisy command output into a small, reliable answer: which interface owns an address, which route will be used, which process listens on a port, which resolver is active, or which packet pattern explains a failure. The commands in this track use captured fixtures so the checks are deterministic and safe to run without root or live network access.

    Treat the fixture as output from the real utility named in the exercise. Read it before writing the command. Prefer structured output when a tool provides it, such as ip -j, and use text tools carefully when the historical utility only prints human-oriented output. Keep ordering explicit with sort, ORDER BY-style thinking, or stable field selection. Avoid hard-coding the final answer directly; the checker looks for the relevant utility or parsing technique.

    The goal is practical fluency: fast diagnosis, reproducible notes, and shell snippets that survive whitespace, multiple interfaces, and ordinary production variation.
  `;
}

function hintsFor() {
  return text`
    # Hints

    1. Identify the field boundaries in the fixture before writing the pipeline.
    2. Prefer jq for JSON fixtures, awk for column-oriented output, and sed for focused extraction or redaction.
    3. If the command output might vary by discovery order, sort the final report before comparing it.
  `;
}

function taskFor(ex) {
  return text`
    # ${ex.title}

    ## Learning Objectives
    ${ex.objectives.map((o) => `- ${o}`).join("\n")}

    ## Task
    ${ex.task}

    Edit \`starter/task.sh\`. The files under \`data/\` are captured outputs from networking utilities. The \`solution/\` directory is only for reference verification.

    ## Expected Commands
    - From this exercise: \`${ex.checkCommand}\`
    - From the repository root: \`node tools/drill-runner.mjs check ${ex.id}\`
    - Reference check: \`node tools/drill-runner.mjs check ${ex.id} --solution\`

    ## Expected Output
    \`\`\`text
    ${ex.expected.trimEnd()}
    \`\`\`

    ## Difficulty
    ${ex.difficulty}

    ## Estimated Time
    ${ex.minutes} minutes

    ## Tags
    ${ex.tags.map((tag) => `- ${tag}`).join("\n")}
  `.replace(/^ {4}/gm, "");
}

function metadata(ex) {
  return {
    id: ex.id,
    title: ex.title,
    language: "networking",
    track: "networking-tools",
    topic: ex.topic,
    difficulty: ex.difficulty,
    estimated_minutes: ex.minutes,
    tags: ex.tags,
    theory_file: "THEORY.md",
    task_file: "TASK.md",
    starter_path: "starter",
    solution_path: "solution",
    check_command: "node ../tests/check.mjs .",
    solution_check_command: "node ../tests/check.mjs .",
    prerequisites: [],
  };
}

function drill(def) {
  return {
    checkCommand: "node ../tests/check.mjs .",
    difficulty: "intermediate",
    minutes: 25,
    staticIncludes: [],
    files: {},
    ...def,
  };
}

const exercises = [
  drill({
    id: "networking-tools/ip/001-ip-json-addresses",
    title: "ip JSON Address Inventory",
    topic: "ip",
    focus: "the modern `ip` utility and JSON address output for interface inventory",
    task: "Produce `interface address/prefix` lines for non-loopback IPv4 addresses from `data/ip-addr.json`, sorted by interface.",
    objectives: ["Read `ip -j addr` style output", "Select non-loopback IPv4 addresses", "Use structured JSON instead of brittle text parsing"],
    tags: ["ip", "iproute2", "interfaces", "jq"],
    expected: "eth0 192.168.10.23/24\nwlan0 10.20.0.8/16\n",
    staticIncludes: ["jq", "addr_info", "local"],
    files: {
      "data/ip-addr.json": `[{"ifname":"lo","operstate":"UNKNOWN","addr_info":[{"family":"inet","local":"127.0.0.1","prefixlen":8}]},{"ifname":"eth0","operstate":"UP","addr_info":[{"family":"inet","local":"192.168.10.23","prefixlen":24},{"family":"inet6","local":"fe80::1","prefixlen":64}]},{"ifname":"wlan0","operstate":"DOWN","addr_info":[{"family":"inet","local":"10.20.0.8","prefixlen":16}]}]\n`,
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: parse ip -j addr style output.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      jq -r '.[] | select(.ifname != "lo") | .ifname as $if | .addr_info[] | select(.family == "inet") | "\\($if) \\(.local)/\\(.prefixlen)"' data/ip-addr.json | sort
    `,
  }),
  drill({
    id: "networking-tools/ip/002-brief-link-state",
    title: "ip Brief Link State",
    topic: "ip",
    focus: "`ip -br link` output and quick interface state triage",
    task: "Parse `data/ip-br-link.txt` and print physical interface names with their state, excluding loopback and virtual docker interfaces.",
    objectives: ["Read brief iproute2 output", "Filter virtual interfaces", "Produce quick interface-state reports"],
    tags: ["ip", "iproute2", "interfaces", "awk"],
    expected: "enp1s0 UP\nwlp2s0 DOWN\n",
    staticIncludes: ["awk"],
    files: {
      "data/ip-br-link.txt": "lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP>\nenp1s0           UP             52:54:00:12:34:56 <BROADCAST,MULTICAST,UP,LOWER_UP>\nwlp2s0           DOWN           70:1c:e7:aa:bb:cc <BROADCAST,MULTICAST>\ndocker0          DOWN           02:42:ac:11:00:01 <NO-CARRIER,BROADCAST,MULTICAST,UP>\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize physical link states.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$1 != "lo" && $1 !~ /^docker/ { print $1, $2 }' data/ip-br-link.txt | sort
    `,
  }),
  drill({
    id: "networking-tools/ip/003-default-routes",
    title: "Default Route Report",
    topic: "ip",
    focus: "`ip route` default routes, gateways, interfaces, and metrics",
    task: "Parse `data/ip-route.txt` and print default routes as `metric gateway dev`, sorted by metric.",
    objectives: ["Identify default routes", "Extract gateway, device, and metric", "Reason about route priority"],
    tags: ["ip", "routes", "gateway", "awk"],
    expected: "100 192.168.10.1 eth0\n600 10.20.0.1 wlan0\n",
    staticIncludes: ["awk", "default"],
    files: {
      "data/ip-route.txt": "default via 192.168.10.1 dev eth0 proto dhcp metric 100\ndefault via 10.20.0.1 dev wlan0 proto dhcp metric 600\n192.168.10.0/24 dev eth0 proto kernel scope link src 192.168.10.23 metric 100\n10.20.0.0/16 dev wlan0 proto kernel scope link src 10.20.0.8 metric 600\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract default routes.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$1 == "default" { for (i=1;i<=NF;i++) { if ($i=="via") gw=$(i+1); if ($i=="dev") dev=$(i+1); if ($i=="metric") metric=$(i+1) } print metric, gw, dev }' data/ip-route.txt | sort -n
    `,
  }),
  drill({
    id: "networking-tools/ip/004-route-get",
    title: "Route Get Decision",
    topic: "ip",
    focus: "`ip route get` decision output for source address and egress interface diagnosis",
    task: "Parse `data/ip-route-get.txt` and print `dev=<dev> src=<src> via=<gateway-or-direct>`.",
    objectives: ["Read route decision output", "Extract egress interface and source address", "Handle routes with a gateway"],
    tags: ["ip", "routes", "diagnostics"],
    expected: "dev=eth0 src=192.168.10.23 via=192.168.10.1\n",
    staticIncludes: ["awk", "src"],
    files: {
      "data/ip-route-get.txt": "8.8.8.8 via 192.168.10.1 dev eth0 src 192.168.10.23 uid 1000 \n    cache \n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract dev, src, and gateway from route get output.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk 'NR == 1 { via="direct"; for (i=1;i<=NF;i++) { if ($i=="via") via=$(i+1); if ($i=="dev") dev=$(i+1); if ($i=="src") src=$(i+1) } printf "dev=%s src=%s via=%s\\n", dev, src, via }' data/ip-route-get.txt
    `,
  }),
  drill({
    id: "networking-tools/ifconfig/001-legacy-ipv4-summary",
    title: "ifconfig IPv4 Summary",
    topic: "ifconfig",
    focus: "legacy `ifconfig` output and IPv4/netmask/broadcast extraction",
    task: "Parse `data/ifconfig.txt` and print `interface ipv4 netmask broadcast` for interfaces with IPv4 addresses, excluding loopback.",
    objectives: ["Read legacy net-tools output", "Associate indented address lines with interfaces", "Extract IPv4, netmask, and broadcast fields"],
    tags: ["ifconfig", "net-tools", "interfaces", "awk"],
    expected: "eth0 192.168.10.23 255.255.255.0 192.168.10.255\nwlan0 10.20.0.8 255.255.0.0 10.20.255.255\n",
    staticIncludes: ["awk", "inet"],
    files: {
      "data/ifconfig.txt": "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.10.23  netmask 255.255.255.0  broadcast 192.168.10.255\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0\nwlan0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500\n        inet 10.20.0.8  netmask 255.255.0.0  broadcast 10.20.255.255\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize IPv4 fields from ifconfig output.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '/^[^[:space:]]/ { iface=$1; sub(/:$/, "", iface) } /^[[:space:]]+inet / && iface != "lo" { print iface, $2, $4, $6 }' data/ifconfig.txt
    `,
  }),
  drill({
    id: "networking-tools/ifconfig/002-error-counters",
    title: "ifconfig Error Counters",
    topic: "ifconfig",
    focus: "RX/TX error and drop counters in legacy interface output",
    task: "Parse `data/ifconfig-errors.txt` and print interfaces with nonzero RX or TX errors/drops as `iface rx_errors rx_dropped tx_errors tx_dropped`.",
    objectives: ["Read error counters", "Track interface context", "Report only suspicious interfaces"],
    tags: ["ifconfig", "errors", "packet-loss", "awk"],
    expected: "eth0 2 4 0 1\n",
    staticIncludes: ["awk", "RX errors", "TX errors"],
    files: {
      "data/ifconfig-errors.txt": "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>\n        RX packets 1000  bytes 90000 (90.0 KB)\n        RX errors 2  dropped 4  overruns 0  frame 0\n        TX packets 800  bytes 70000 (70.0 KB)\n        TX errors 0  dropped 1 overruns 0  carrier 0  collisions 0\nwlan0: flags=4099<UP,BROADCAST,MULTICAST>\n        RX packets 10  bytes 1000\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 8  bytes 900\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: find interfaces with RX/TX errors or drops.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '/^[^[:space:]]/ { if (iface && (rxe+rxd+txe+txd)>0) print iface, rxe, rxd, txe, txd; iface=$1; sub(/:$/, "", iface); rxe=rxd=txe=txd=0 } /RX errors/ { rxe=$3; rxd=$5 } /TX errors/ { txe=$3; txd=$5 } END { if (iface && (rxe+rxd+txe+txd)>0) print iface, rxe, rxd, txe, txd }' data/ifconfig-errors.txt
    `,
  }),
  drill({
    id: "networking-tools/ipconfig/001-windows-adapters",
    title: "Windows ipconfig Adapter Summary",
    topic: "ipconfig",
    focus: "Windows `ipconfig /all` output and adapter-to-address association",
    task: "Parse `data/ipconfig.txt` and print adapters with IPv4 addresses as `adapter|ipv4`, excluding disconnected adapters.",
    objectives: ["Read Windows ipconfig output", "Associate adapter blocks with IPv4 addresses", "Recognize disconnected media state"],
    tags: ["ipconfig", "windows", "interfaces", "awk"],
    expected: "Ethernet adapter Ethernet|192.168.10.44\nWireless LAN adapter Wi-Fi|10.0.0.15\n",
    staticIncludes: ["awk", "IPv4 Address"],
    files: {
      "data/ipconfig.txt": "Windows IP Configuration\n\nEthernet adapter Ethernet:\n\n   Connection-specific DNS Suffix  . : lan\n   IPv4 Address. . . . . . . . . . . : 192.168.10.44(Preferred)\n   Default Gateway . . . . . . . . . : 192.168.10.1\n\nWireless LAN adapter Wi-Fi:\n\n   IPv4 Address. . . . . . . . . . . : 10.0.0.15(Preferred)\n   Default Gateway . . . . . . . . . : 10.0.0.1\n\nEthernet adapter vEthernet:\n\n   Media State . . . . . . . . . . . : Media disconnected\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize Windows ipconfig adapter IPv4 addresses.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '/ adapter .*:$/ { adapter=$0; sub(/:$/, "", adapter) } /IPv4 Address/ { ip=$NF; sub(/\\(Preferred\\)/, "", ip); print adapter "|" ip }' data/ipconfig.txt
    `,
  }),
  drill({
    id: "networking-tools/ipconfig/002-gateway-dns",
    title: "Windows ipconfig Gateway and DNS",
    topic: "ipconfig",
    focus: "Windows gateway and DNS server fields for client resolver diagnosis",
    task: "Parse `data/ipconfig-dns.txt` and print `adapter gateway dns1,dns2` for adapters with a default gateway.",
    objectives: ["Extract gateway fields", "Collect multi-line DNS server fields", "Summarize Windows resolver configuration"],
    tags: ["ipconfig", "windows", "dns", "gateway"],
    expected: "Wireless LAN adapter Wi-Fi 10.0.0.1 1.1.1.1,8.8.8.8\n",
    staticIncludes: ["awk", "DNS Servers"],
    files: {
      "data/ipconfig-dns.txt": "Wireless LAN adapter Wi-Fi:\n   DNS Servers . . . . . . . . . . . : 1.1.1.1\n                                       8.8.8.8\n   Default Gateway . . . . . . . . . : 10.0.0.1\n\nEthernet adapter Lab:\n   DNS Servers . . . . . . . . . . . : 192.168.50.2\n   Default Gateway . . . . . . . . . :\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract gateway and DNS servers.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '/ adapter .*:$/ { if (adapter && gw) print adapter, gw, dns; adapter=$0; sub(/:$/, "", adapter); dns=""; gw="" } /DNS Servers/ { dns=$NF; next } /^[[:space:]]+[0-9]+\\./ && dns != "" { dns=dns "," $1 } /Default Gateway/ && $NF ~ /^[0-9]/ { gw=$NF } END { if (adapter && gw) print adapter, gw, dns }' data/ipconfig-dns.txt
    `,
  }),
  drill({
    id: "networking-tools/ss/001-listening-tcp",
    title: "ss Listening TCP Ports",
    topic: "ss",
    focus: "`ss -ltnp` output for listening TCP ports and owning processes",
    task: "Parse `data/ss-ltnp.txt` and print `port process` for listening TCP sockets, sorted numerically by port.",
    objectives: ["Read ss listening socket output", "Extract local ports", "Identify owning processes"],
    tags: ["ss", "ports", "processes", "sockets"],
    expected: "22 sshd\n5432 postgres\n8080 node\n",
    staticIncludes: ["awk", "LISTEN"],
    files: {
      "data/ss-ltnp.txt": "State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\nLISTEN 0      128          0.0.0.0:22        0.0.0.0:*     users:((\"sshd\",pid=812,fd=3))\nLISTEN 0      4096       127.0.0.1:5432      0.0.0.0:*     users:((\"postgres\",pid=900,fd=5))\nLISTEN 0      511                *:8080             *:*     users:((\"node\",pid=1200,fd=22))\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize listening TCP ports.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$1 == "LISTEN" { split($4,a,":"); port=a[length(a)]; proc=$0; sub(/^.*users:\\(\\(\\"/, "", proc); sub(/\\".*$/, "", proc); print port, proc }' data/ss-ltnp.txt | sort -n
    `,
  }),
  drill({
    id: "networking-tools/ss/002-connection-states",
    title: "ss Connection State Counts",
    topic: "ss",
    focus: "`ss -tan` state counts for quick TCP connection triage",
    task: "Parse `data/ss-tan.txt` and count TCP connections by state, excluding the header and LISTEN sockets.",
    objectives: ["Read ss TCP state names", "Count state distribution", "Ignore listening sockets when investigating active connections"],
    tags: ["ss", "tcp", "states", "awk"],
    expected: "ESTAB 3\nSYN-SENT 1\nTIME-WAIT 2\n",
    staticIncludes: ["awk"],
    files: {
      "data/ss-tan.txt": "State      Recv-Q Send-Q Local Address:Port Peer Address:Port\nESTAB      0      0      10.0.0.2:443     10.0.0.8:55120\nTIME-WAIT  0      0      10.0.0.2:443     10.0.0.9:55121\nESTAB      0      0      10.0.0.2:5432    10.0.0.10:55122\nLISTEN     0      128    0.0.0.0:22       0.0.0.0:*\nSYN-SENT   0      1      10.0.0.2:41000   198.51.100.10:443\nTIME-WAIT  0      0      10.0.0.2:443     10.0.0.11:55123\nESTAB      0      0      10.0.0.2:443     10.0.0.12:55124\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: count active TCP states.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk 'NR > 1 && $1 != "LISTEN" { count[$1]++ } END { for (state in count) print state, count[state] }' data/ss-tan.txt | sort
    `,
  }),
  drill({
    id: "networking-tools/dns/001-resolv-conf",
    title: "resolv.conf Summary",
    topic: "dns",
    focus: "`/etc/resolv.conf` resolver fields: search domains, nameservers, and options",
    task: "Parse `data/resolv.conf` and print one line for search domains and one for nameservers.",
    objectives: ["Read resolver configuration", "Separate search domains from nameservers", "Ignore comments and options"],
    tags: ["dns", "resolv.conf", "awk"],
    expected: "search corp.example internal.example\nnameservers 10.0.0.53 1.1.1.1\n",
    staticIncludes: ["awk", "nameserver"],
    files: {
      "data/resolv.conf": "# managed by NetworkManager\nsearch corp.example internal.example\nnameserver 10.0.0.53\nnameserver 1.1.1.1\noptions edns0 trust-ad\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize resolver search domains and nameservers.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$1 == "search" { print $0 } $1 == "nameserver" { ns = ns " " $2 } END { sub(/^ /, "", ns); print "nameservers " ns }' data/resolv.conf
    `,
  }),
  drill({
    id: "networking-tools/dns/002-dig-answer",
    title: "dig Answer Records",
    topic: "dns",
    focus: "`dig` answer sections, TTLs, record types, and returned addresses",
    task: "Parse `data/dig-example.txt` and print A records as `name ttl ip`, sorted by IP.",
    objectives: ["Read dig answer sections", "Extract record TTL and address", "Ignore comments and metadata"],
    tags: ["dns", "dig", "records", "awk"],
    expected: "example.com. 300 93.184.216.34\nwww.example.com. 60 93.184.216.34\n",
    staticIncludes: ["awk", "\"A\""],
    files: {
      "data/dig-example.txt": "; <<>> DiG 9.18 <<>> example.com A\n;; ANSWER SECTION:\nexample.com. 300 IN A 93.184.216.34\nwww.example.com. 60 IN A 93.184.216.34\n;; Query time: 20 msec\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract A records from dig output.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$4 == "A" { print $1, $2, $5 }' data/dig-example.txt | sort -k3,3 -k1,1
    `,
  }),
  drill({
    id: "networking-tools/dns/003-hosts-overrides",
    title: "hosts File Overrides",
    topic: "dns",
    focus: "`/etc/hosts` local name overrides and alias expansion",
    task: "Parse `data/hosts` and print `hostname ip` for non-loopback host aliases, sorted by hostname.",
    objectives: ["Read hosts-file alias rows", "Ignore comments and loopback entries", "Expand multiple aliases per address"],
    tags: ["dns", "hosts", "awk"],
    expected: "api 192.168.10.20\napi.local 192.168.10.20\ndb.local 192.168.10.21\npostgres.local 192.168.10.21\n",
    staticIncludes: ["awk"],
    files: {
      "data/hosts": "127.0.0.1 localhost\n# lab overrides\n192.168.10.20 api.local api\n192.168.10.21 db.local postgres.local\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: expand non-loopback hosts aliases.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$1 !~ /^#/ && $1 !~ /^127\\./ && NF > 1 { for (i=2;i<=NF;i++) print $i, $1 }' data/hosts | sort
    `,
  }),
  drill({
    id: "networking-tools/ping/001-packet-loss",
    title: "ping Packet Loss and RTT",
    topic: "ping",
    focus: "`ping` summary output for packet loss and latency diagnosis",
    task: "Parse `data/ping.txt` and print `loss=<loss> avg_ms=<avg>` from the packet summary and RTT line.",
    objectives: ["Read packet loss summaries", "Extract average RTT", "Produce a compact diagnostic line"],
    tags: ["ping", "latency", "packet-loss", "sed"],
    expected: "loss=25% avg_ms=18.734\n",
    staticIncludes: ["sed", "packet loss"],
    files: {
      "data/ping.txt": "4 packets transmitted, 3 received, 25% packet loss, time 3004ms\nrtt min/avg/max/mdev = 12.100/18.734/25.200/5.123 ms\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract packet loss and average RTT.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      loss=$(sed -n 's/.*received, \\([0-9.]*%\\) packet loss.*/\\1/p' data/ping.txt)
      avg=$(sed -n 's#rtt min/avg/max/mdev = [^/]*/\\([^/]*\\)/.*#\\1#p' data/ping.txt)
      printf 'loss=%s avg_ms=%s\\n' "$loss" "$avg"
    `,
  }),
  drill({
    id: "networking-tools/traceroute/001-hop-summary",
    title: "traceroute Hop Summary",
    topic: "traceroute",
    focus: "`traceroute` hop output, timeouts, and first-responsive-hop extraction",
    task: "Parse `data/traceroute.txt` and print responsive hops as `hop host ip`, excluding timeout-only hops.",
    objectives: ["Read traceroute hop numbers", "Ignore timeout hops", "Extract host and IP fields"],
    tags: ["traceroute", "routing", "latency", "awk"],
    expected: "1 router.local 192.168.10.1\n3 edge.example.net 203.0.113.1\n4 example.com 93.184.216.34\n",
    staticIncludes: ["awk"],
    files: {
      "data/traceroute.txt": "traceroute to example.com (93.184.216.34), 30 hops max\n 1  router.local (192.168.10.1)  1.123 ms  1.210 ms\n 2  * * *\n 3  edge.example.net (203.0.113.1)  12.000 ms  12.400 ms\n 4  example.com (93.184.216.34)  20.000 ms  20.100 ms\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize responsive traceroute hops.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$2 != "*" && $1 ~ /^[0-9]+$/ { ip=$3; gsub(/[()]/, "", ip); print $1, $2, ip }' data/traceroute.txt
    `,
  }),
  drill({
    id: "networking-tools/curl/001-write-out-metrics",
    title: "curl Write-Out Metrics",
    topic: "curl",
    focus: "`curl -w` style metrics for HTTP status, remote IP, and total time",
    task: "Parse `data/curl-write-out.txt` and print `status=<code> remote=<ip> total=<seconds>`.",
    objectives: ["Read curl diagnostic metrics", "Extract HTTP status and timing", "Summarize remote endpoint information"],
    tags: ["curl", "http", "diagnostics", "awk"],
    expected: "status=200 remote=93.184.216.34 total=0.153\n",
    staticIncludes: ["awk", "http_code"],
    files: {
      "data/curl-write-out.txt": "http_code=200\nremote_ip=93.184.216.34\ntime_namelookup=0.010\ntime_connect=0.040\ntime_total=0.153\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize curl write-out metrics.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk -F= '{ v[$1]=$2 } END { printf "status=%s remote=%s total=%s\\n", v["http_code"], v["remote_ip"], v["time_total"] }' data/curl-write-out.txt
    `,
  }),
  drill({
    id: "networking-tools/curl/002-response-headers",
    title: "curl Response Header Audit",
    topic: "curl",
    focus: "HTTP response headers from `curl -I` and cache/content-type checks",
    task: "Parse `data/headers.txt` and print `content-type=<value>` and `cache=<value>` with lowercase header names.",
    objectives: ["Read HTTP response headers", "Normalize header names", "Extract cache and content-type behavior"],
    tags: ["curl", "http", "headers", "awk"],
    expected: "content-type=text/html; charset=UTF-8\ncache=max-age=3600\n",
    staticIncludes: ["awk", "tolower"],
    files: {
      "data/headers.txt": "HTTP/2 200\nDate: Sun, 21 Jun 2026 08:00:00 GMT\nContent-Type: text/html; charset=UTF-8\nCache-Control: max-age=3600\nServer: example\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract content type and cache headers.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk 'BEGIN{FS=": "} { key=tolower($1); if (key=="content-type") ct=$2; if (key=="cache-control") cache=$2 } END { print "content-type=" ct; print "cache=" cache }' data/headers.txt
    `,
  }),
  drill({
    id: "networking-tools/tcpdump/001-tcp-flags",
    title: "tcpdump TCP Flag Counts",
    topic: "tcpdump",
    focus: "`tcpdump` TCP flag notation for handshake and teardown diagnosis",
    task: "Parse `data/tcpdump-tcp.txt` and count SYN-only, SYN-ACK, and FIN packets.",
    objectives: ["Read tcpdump TCP flags", "Distinguish SYN from SYN-ACK", "Summarize handshake patterns"],
    tags: ["tcpdump", "tcp", "packets", "awk"],
    expected: "FIN 1\nSYN 2\nSYN-ACK 1\n",
    staticIncludes: ["awk", "Flags"],
    files: {
      "data/tcpdump-tcp.txt": "10:00:00 IP 10.0.0.5.55000 > 10.0.0.10.443: Flags [S], seq 1\n10:00:00 IP 10.0.0.10.443 > 10.0.0.5.55000: Flags [S.], seq 2, ack 2\n10:00:01 IP 10.0.0.5.55001 > 10.0.0.10.443: Flags [S], seq 1\n10:00:05 IP 10.0.0.5.55000 > 10.0.0.10.443: Flags [F.], seq 20, ack 30\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: count TCP flags in tcpdump output.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '/Flags \\[S\\]/ { syn++ } /Flags \\[S\\.\\]/ { synack++ } /Flags \\[F\\.\\]/ { fin++ } END { print "FIN", fin+0; print "SYN", syn+0; print "SYN-ACK", synack+0 }' data/tcpdump-tcp.txt
    `,
  }),
  drill({
    id: "networking-tools/tcpdump/002-dns-queries",
    title: "tcpdump DNS Query Names",
    topic: "tcpdump",
    focus: "`tcpdump` DNS query lines and queried-name extraction",
    task: "Parse `data/tcpdump-dns.txt` and print unique DNS query names, sorted alphabetically.",
    objectives: ["Recognize DNS query packets", "Extract queried names", "De-duplicate repeated queries"],
    tags: ["tcpdump", "dns", "packets", "awk"],
    expected: "api.internal.example.\nexample.com.\n",
    staticIncludes: ["awk", "A\\?"],
    files: {
      "data/tcpdump-dns.txt": "10:00:00 IP 10.0.0.5.55200 > 10.0.0.53.53: 1234+ A? example.com. (29)\n10:00:01 IP 10.0.0.5.55201 > 10.0.0.53.53: 1235+ AAAA? example.com. (29)\n10:00:02 IP 10.0.0.5.55202 > 10.0.0.53.53: 1236+ A? api.internal.example. (38)\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract unique A-query names.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$0 ~ / A\\? / { for (i=1;i<=NF;i++) if ($i=="A?") print $(i+1) }' data/tcpdump-dns.txt | sort -u
    `,
  }),
  drill({
    id: "networking-tools/neigh/001-ip-neigh",
    title: "Neighbor Table States",
    topic: "neigh",
    focus: "`ip neigh` ARP/NDP neighbor states for local-link diagnosis",
    task: "Parse `data/ip-neigh.txt` and print `ip dev state` for STALE or FAILED neighbors.",
    objectives: ["Read neighbor table states", "Identify suspicious neighbor entries", "Preserve interface context"],
    tags: ["ip", "neigh", "arp", "layer2"],
    expected: "192.168.10.50 eth0 STALE\n192.168.10.99 eth0 FAILED\n",
    staticIncludes: ["awk", "FAILED"],
    files: {
      "data/ip-neigh.txt": "192.168.10.1 dev eth0 lladdr aa:bb:cc:dd:ee:ff REACHABLE\n192.168.10.50 dev eth0 lladdr 00:11:22:33:44:55 STALE\n192.168.10.99 dev eth0 FAILED\n10.20.0.1 dev wlan0 lladdr 66:77:88:99:aa:bb DELAY\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: report stale or failed neighbors.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$NF == "STALE" || $NF == "FAILED" { for (i=1;i<=NF;i++) if ($i=="dev") dev=$(i+1); print $1, dev, $NF }' data/ip-neigh.txt
    `,
  }),
  drill({
    id: "networking-tools/firewall/001-nft-open-ports",
    title: "nftables Open TCP Ports",
    topic: "firewall",
    focus: "`nft list ruleset` style rules and allowed service ports",
    task: "Parse `data/nft-ruleset.txt` and print allowed TCP destination ports from accept rules, one per line sorted numerically.",
    objectives: ["Read nftables rule syntax", "Identify accept rules", "Extract allowed destination ports"],
    tags: ["nft", "firewall", "ports", "sed"],
    expected: "22\n443\n",
    staticIncludes: ["sed", "tcp dport"],
    files: {
      "data/nft-ruleset.txt": "table inet filter {\n chain input {\n  type filter hook input priority 0; policy drop;\n  tcp dport 22 accept\n  tcp dport 443 accept\n  tcp dport 5432 drop\n }\n}\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: list accepted TCP ports from nft output.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      sed -n 's/.*tcp dport \\([0-9][0-9]*\\) accept.*/\\1/p' data/nft-ruleset.txt | sort -n
    `,
  }),
  drill({
    id: "networking-tools/firewall/002-iptables-drops",
    title: "iptables Drop Counters",
    topic: "firewall",
    focus: "`iptables -L -v -n` counters for dropped traffic triage",
    task: "Parse `data/iptables.txt` and print DROP rules with packet counts as `pkts target proto dpt`, sorted descending by packet count.",
    objectives: ["Read iptables counters", "Extract destination ports", "Prioritize high-volume drops"],
    tags: ["iptables", "firewall", "counters", "awk"],
    expected: "120 DROP tcp 23\n12 DROP tcp 5432\n",
    staticIncludes: ["awk", "DROP"],
    files: {
      "data/iptables.txt": "Chain INPUT (policy ACCEPT 1000 packets, 80000 bytes)\n pkts bytes target prot opt in out source destination\n  120  7200 DROP tcp -- * * 0.0.0.0/0 0.0.0.0/0 tcp dpt:23\n   12   720 DROP tcp -- * * 0.0.0.0/0 0.0.0.0/0 tcp dpt:5432\n    4   240 ACCEPT tcp -- * * 0.0.0.0/0 0.0.0.0/0 tcp dpt:22\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize DROP counters.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$3 == "DROP" { port=""; for (i=1;i<=NF;i++) if ($i ~ /^dpt:/) { port=$i; sub(/^dpt:/, "", port) } print $1, $3, $4, port }' data/iptables.txt | sort -nr
    `,
  }),
  drill({
    id: "networking-tools/nmcli/001-device-status",
    title: "nmcli Device Status",
    topic: "nmcli",
    focus: "`nmcli device status` output for NetworkManager interface state",
    task: "Parse `data/nmcli-device.txt` and print connected devices as `device type connection`, sorted by device.",
    objectives: ["Read NetworkManager device state", "Filter connected devices", "Preserve multi-word connection names"],
    tags: ["nmcli", "networkmanager", "interfaces"],
    expected: "enp1s0 ethernet Wired connection 1\nwlp2s0 wifi Corp WiFi\n",
    staticIncludes: ["awk", "connected"],
    files: {
      "data/nmcli-device.txt": "DEVICE  TYPE      STATE                   CONNECTION\nenp1s0  ethernet  connected               Wired connection 1\nwlp2s0  wifi      connected               Corp WiFi\nlo      loopback  connected (externally)  lo\ndocker0 bridge    unmanaged               --\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: list connected NetworkManager devices.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk 'NR > 1 && $3 == "connected" && $2 != "loopback" { conn=$4; for (i=5;i<=NF;i++) conn=conn " " $i; print $1, $2, conn }' data/nmcli-device.txt | sort
    `,
  }),
  drill({
    id: "networking-tools/ethtool/001-link-speed-duplex",
    title: "ethtool Speed and Duplex",
    topic: "ethtool",
    focus: "`ethtool` link details for speed, duplex, and link-detected checks",
    task: "Parse `data/ethtool-eth0.txt` and print `speed=<speed> duplex=<duplex> link=<yes|no>`.",
    objectives: ["Read physical link details", "Extract speed and duplex", "Check carrier state"],
    tags: ["ethtool", "ethernet", "link"],
    expected: "speed=1000Mb/s duplex=Full link=yes\n",
    staticIncludes: ["awk", "Speed"],
    files: {
      "data/ethtool-eth0.txt": "Settings for eth0:\n\tSupported ports: [ TP ]\n\tSpeed: 1000Mb/s\n\tDuplex: Full\n\tAuto-negotiation: on\n\tLink detected: yes\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: summarize ethtool link details.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk -F': ' '/Speed/ { speed=$2 } /Duplex/ { duplex=$2 } /Link detected/ { link=$2 } END { printf "speed=%s duplex=%s link=%s\\n", speed, duplex, link }' data/ethtool-eth0.txt
    `,
  }),
  drill({
    id: "networking-tools/sysctl/001-forwarding",
    title: "sysctl Forwarding Flags",
    topic: "sysctl",
    focus: "`sysctl` network kernel flags for host routing behavior",
    task: "Parse `data/sysctl-net.txt` and print enabled forwarding flags as `key=enabled`, sorted by key.",
    objectives: ["Read sysctl key/value output", "Identify forwarding flags", "Explain routing-capable host settings"],
    tags: ["sysctl", "kernel", "routing"],
    expected: "net.ipv4.ip_forward=enabled\nnet.ipv6.conf.all.forwarding=enabled\n",
    staticIncludes: ["awk", "forward"],
    files: {
      "data/sysctl-net.txt": "net.ipv4.ip_forward = 1\nnet.ipv6.conf.all.forwarding = 1\nnet.ipv4.conf.all.rp_filter = 2\nnet.ipv4.tcp_syncookies = 1\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: find enabled forwarding sysctls.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '$1 ~ /forward/ && $3 == 1 { print $1 "=enabled" }' data/sysctl-net.txt | sort
    `,
  }),
];

function checkerSource(ex) {
  return text`
    #!/usr/bin/env node
    import { spawnSync } from "node:child_process";
    import { readFileSync } from "node:fs";
    import path from "node:path";

    const target = path.resolve(process.argv[2] ?? ".");
    const expected = ${JSON.stringify(ex.expected)};
    const staticIncludes = ${JSON.stringify(ex.staticIncludes)};
    const body = readFileSync(path.join(target, "task.sh"), "utf8");
    const failures = [];

    if (/(^|\\n)\\s*# TODO/.test(body)) failures.push("task.sh still contains starter TODO markers");
    for (const token of staticIncludes) {
      if (!body.includes(token)) failures.push("task.sh must include: " + token);
    }

    const result = spawnSync("bash", ["task.sh"], {
      cwd: target,
      encoding: "utf8",
      env: { ...process.env, LC_ALL: "C" },
    });
    if (result.status !== 0) {
      failures.push("task exited with " + result.status + "\\n" + result.stderr);
    }
    const stdout = result.stdout.replace(/\\r\\n/g, "\\n");
    if (stdout !== expected) {
      failures.push("stdout mismatch\\nGOT:\\n" + stdout + "\\nWANT:\\n" + expected);
    }

    if (failures.length) {
      console.error(failures.map(f => "- " + f).join("\\n"));
      process.exit(1);
    }
    console.log("networking tool checks passed");
  `.trimStart();
}

async function writeExercise(ex) {
  await writeJSON(`${ex.id}/exercise.json`, metadata(ex));
  await write(`${ex.id}/THEORY.md`, theoryFor(ex));
  await write(`${ex.id}/TASK.md`, taskFor(ex));
  await write(`${ex.id}/HINTS.md`, hintsFor());
  await write(`${ex.id}/tests/check.mjs`, checkerSource(ex));

  for (const side of ["starter", "solution"]) {
    for (const [rel, body] of Object.entries(ex.files)) {
      await write(`${ex.id}/${side}/${rel}`, body);
    }
    await write(`${ex.id}/${side}/task.sh`, side === "starter" ? ex.starter : ex.solution);
  }
}

for (const ex of exercises) await writeExercise(ex);
console.log(`generated ${exercises.length} networking drills`);
