/**
 * WaterWorks - Wallet Connection Module
 * Handles MetaMask and other wallet connections
 */

class WalletConnect {
    constructor() {
        this.account = null;
        this.chainId = null;
        this.provider = null;
        
        this.init();
    }

    init() {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            this.provider = window.ethereum;
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                this.handleAccountsChanged(accounts);
            });

            // Listen for chain changes
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });

            // Check if already connected
            this.checkConnection();
        }
    }

    async checkConnection() {
        try {
            const accounts = await this.provider.request({ 
                method: 'eth_accounts' 
            });
            if (accounts.length > 0) {
                this.handleAccountsChanged(accounts);
            }
        } catch (error) {
            console.log('Not connected');
        }
    }

    async connect() {
        if (!this.provider) {
            // No MetaMask - show install prompt
            window.open('https://metamask.io/download/', '_blank');
            return null;
        }

        try {
            const accounts = await this.provider.request({ 
                method: 'eth_requestAccounts' 
            });
            
            this.handleAccountsChanged(accounts);
            return this.account;
        } catch (error) {
            console.error('Connection error:', error);
            return null;
        }
    }

    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // User disconnected
            this.account = null;
            this.updateUI(null);
        } else {
            this.account = accounts[0];
            this.updateUI(this.account);
        }
    }

    updateUI(account) {
        const connectBtn = document.getElementById('connectWallet');
        const walletText = document.getElementById('walletText');
        const walletInput = document.getElementById('walletAddress');

        if (account) {
            // Connected state
            const shortAddress = `${account.slice(0, 6)}...${account.slice(-4)}`;
            walletText.textContent = shortAddress;
            connectBtn.classList.add('wallet-connected');
            
            if (walletInput) {
                walletInput.value = account;
            }

            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('walletConnected', { 
                detail: { account } 
            }));
        } else {
            // Disconnected state
            walletText.textContent = 'Connect Wallet';
            connectBtn.classList.remove('wallet-connected');
            
            if (walletInput) {
                walletInput.value = '';
            }
        }
    }

    getAccount() {
        return this.account;
    }

    isConnected() {
        return this.account !== null;
    }

    async signMessage(message) {
        if (!this.account) {
            await this.connect();
        }

        try {
            const signature = await this.provider.request({
                method: 'personal_sign',
                params: [message, this.account]
            });
            return signature;
        } catch (error) {
            console.error('Signing error:', error);
            return null;
        }
    }
}

// Export singleton instance
window.wallet = new WalletConnect();
