import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clankit - Find and trade clanker memecoins" },
    { name: "description", content: "Browse the hottest Clankers and trade them in seconds on Base" },
  ];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const { address, isConnected } = useAccount();

  const tokens = [
    {
      id: 1,
      symbol: "$CLANKER",
      name: "tokenbot",
      marketCap: "$41.05M",
      change: 33.62,
      volume: "$2.45M",
      holders: 12847,
      age: "8 months",
      trending: true,
      avatar: "C",
      color: "linear-gradient(135deg, #00ff88, #00aaff)",
    },
    {
      id: 2,
      symbol: "$GAME",
      name: "G.A.M.E",
      marketCap: "$50.43M",
      change: -11.68,
      volume: "$1.75M",
      holders: 8234,
      age: "9 months",
      avatar: "G",
      color: "linear-gradient(135deg, #ff3366, #ff9933)",
    },
    {
      id: 3,
      symbol: "$TIBBIR",
      name: "Ribbita",
      marketCap: "$105.36M",
      change: -4.99,
      volume: "$756.16K",
      holders: 15672,
      age: "5 months",
      avatar: "T",
      color: "linear-gradient(135deg, #9933ff, #ff33cc)",
    },
    {
      id: 4,
      symbol: "$offside",
      name: "offside",
      marketCap: "$35.94K",
      change: 53.89,
      volume: "$726.58K",
      holders: 342,
      age: "1 day",
      isNew: true,
      avatar: "O",
      color: "linear-gradient(135deg, #33ff99, #33ccff)",
    },
    {
      id: 5,
      symbol: "$GM",
      name: "GMonchain",
      marketCap: "$62.17K",
      change: 22.78,
      volume: "$10.71K",
      holders: 128,
      age: "7 days",
      avatar: "G",
      color: "linear-gradient(135deg, #ffcc33, #ff6633)",
    },
    {
      id: 6,
      symbol: "$MAMO",
      name: "Mamo",
      marketCap: "$16.57M",
      change: 5.04,
      volume: "$524.74K",
      holders: 4567,
      age: "1 month",
      avatar: "M",
      color: "linear-gradient(135deg, #cc33ff, #3366ff)",
    },
  ];

  const stats = [
    { label: "Total Market Cap", value: "$142.5M" },
    { label: "Total Tokens", value: "8,472" },
    { label: "24h Volume", value: "$24.8M" },
    { label: "Active Traders", value: "156.2K" },
  ];

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TokenCard = ({ token }: { token: any }) => (
    <div className="token-card" onClick={() => setSelectedToken(token)}>
      {token.trending && <div className="trending-badge">🔥 HOT</div>}
      {token.isNew && <div className="trending-badge pulse">NEW</div>}
      <div className="token-header">
        <div className="token-info">
          <div className="token-avatar" style={{ background: token.color }}>
            {token.avatar}
          </div>
          <div>
            <div className="token-symbol">{token.symbol}</div>
            <div className="token-name">{token.name}</div>
          </div>
        </div>
        <div className={`token-change ${token.change > 0 ? "positive" : "negative"}`}>
          {token.change > 0 ? "+" : ""}
          {token.change}%
        </div>
      </div>
      <div className="token-stats">
        <div className="token-stat">
          <span className="token-stat-label">Market Cap</span>
          <span className="token-stat-value">{token.marketCap}</span>
        </div>
        <div className="token-stat">
          <span className="token-stat-label">24h Volume</span>
          <span className="token-stat-value">{token.volume}</span>
        </div>
        <div className="token-stat">
          <span className="token-stat-label">Holders</span>
          <span className="token-stat-value">{token.holders.toLocaleString()}</span>
        </div>
        <div className="token-stat">
          <span className="token-stat-label">Age</span>
          <span className="token-stat-value">{token.age}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">clankit</div>
          <nav className="nav-links">
            <a href="#" className="nav-link">
              Trending
            </a>
            <a href="#" className="nav-link">
              New Launches
            </a>
            <a href="#" className="nav-link">
              Analytics
            </a>
            <a href="#" className="nav-link">
              Portfolio
            </a>
            <ConnectButton />
            <Link to="/launch" className="launch-token-btn">
              Launch Token
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <h1>Find and Trade Clanker Memecoins</h1>
        <p>Browse the hottest Clankers and trade them in seconds on Base</p>
        {isConnected && <p className="wallet-info">Connected: {address}</p>}

        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by token name, symbol, or contract..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <div className="container">
        <section>
          <h2 className="section-title">Recent trades across the ecosystem</h2>
          <div className="tokens-grid">
            {filteredTokens.slice(0, 3).map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">New launches with $5k+ volume</h2>
          <div className="tokens-grid">
            {filteredTokens.slice(3, 6).map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>&copy; 2025 clankit | Built on Base | Powered by Clanker Protocol</p>
      </footer>

      {selectedToken && (
        <div className="modal-overlay" onClick={() => setSelectedToken(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>
              {selectedToken.symbol} - {selectedToken.name}
            </h3>
            <p>Trading functionality would be implemented here</p>
            <button className="modal-close" onClick={() => setSelectedToken(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}