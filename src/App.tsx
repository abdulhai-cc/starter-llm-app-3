import React, { useState } from 'react';
import { Search, LineChart, Bitcoin, Feather as Ethereum, CircleDollarSign, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  icon: React.ReactNode;
}

const mockTokens: Token[] = [
  { 
    id: '1', 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    price: 65432.10, 
    change24h: 2.5, 
    marketCap: 1280000000000,
    icon: <Bitcoin className="h-8 w-8 text-orange-500" />
  },
  { 
    id: '2', 
    name: 'Ethereum', 
    symbol: 'ETH', 
    price: 3521.45, 
    change24h: -1.2, 
    marketCap: 420000000000,
    icon: <Ethereum className="h-8 w-8 text-purple-600" />
  },
  { 
    id: '3', 
    name: 'Cardano', 
    symbol: 'ADA', 
    price: 1.23, 
    change24h: 5.7, 
    marketCap: 42000000000,
    icon: <CircleDollarSign className="h-8 w-8 text-blue-500" />
  },
  { 
    id: '4', 
    name: 'Solana', 
    symbol: 'SOL', 
    price: 142.87, 
    change24h: 8.9, 
    marketCap: 58000000000,
    icon: <Wallet className="h-8 w-8 text-emerald-500" />
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tokens, setTokens] = useState<Token[]>(mockTokens);

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatMarketCap = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-600/20">
              <LineChart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Starter Project </h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tokens..."
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTokens.map((token) => (
                  <tr 
                    key={token.id} 
                    className="hover:bg-blue-50/50 transition-colors duration-150 cursor-pointer group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gray-50 rounded-lg p-2 group-hover:scale-110 transition-transform duration-200">
                          {token.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{token.name}</div>
                          <div className="text-sm text-gray-500">{token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {formatNumber(token.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`flex items-center justify-end text-sm font-medium ${
                        token.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {token.change24h >= 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1 animate-pulse" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1 animate-pulse" />
                        )}
                        {Math.abs(token.change24h)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {formatMarketCap(token.marketCap)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;