import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Link } from "react-router";
import type { Route } from "./+types/launch";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "🚀 Clankit - Launch Your Token" },
    { name: "description", content: "Launch a coin with Clanker via clankit" },
  ];
}

export default function Launch() {
  const { address, isConnected } = useAccount();

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">clankit</Link>
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <a href="#" className="nav-link">
              Browse
            </a>
            <a href="#" className="nav-link">
              What is clank.fun?
            </a>
            <Link to="/launch" className="launch-token-btn">
              Launch Token
            </Link>
          </nav>
        </div>
      </header>

      <section className="launch-hero">
        <div className="launch-container">
          <h1>Launch a coin with</h1>
          <h1 className="gradient-text">Clanker via clankit</h1>
          
          <div className="launch-info">
            <p>You need to hold at least 50,000,000 $CLANKIT to launch tokens</p>
          </div>

          <div className="launch-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🚀</span>
              <span>Every trade bumps your coin to the front page</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💰</span>
              <span>Earn 0.4% of the trading volume in LP fees</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <span>Claim your fees anytime on clanker.world</span>
            </div>
          </div>

          <div className="connect-section">
            {isConnected ? (
              <div className="connected-info">
                <ConnectButton />
              </div>
            ) : (
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button onClick={openConnectModal} className="connect-wallet-large">
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button onClick={openChainModal} className="connect-wallet-large">
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div className="connected-info">
                            <p className="wallet-address">Connected: {account.address}</p>
                            <button onClick={openAccountModal} className="connect-wallet-large">
                              {account.displayName}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}