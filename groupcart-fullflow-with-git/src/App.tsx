import { useState } from "react";
import { User, Folder, Info, Menu } from "lucide-react";
import "./index.css";

const tradeProgress = {
  "In progress": { width: "25%", color: "bg-gray-400" },
  Paid: { width: "50%", color: "bg-blue-500" },
  Shipped: { width: "75%", color: "bg-blue-500" },
  Received: { width: "100%", color: "bg-green-500" },
};

const trades = [
  { id: 1, item: "Vintage Game Boy", status: "In progress" },
  { id: 2, item: "SNES Controller", status: "Paid" },
  { id: 3, item: "Zelda Poster", status: "Shipped" },
  { id: 4, item: "Pokémon Red", status: "Received" },
  { id: 5, item: "NES Classic", status: "Paid" },
  { id: 6, item: "GameCube Adapter", status: "In progress" },
  { id: 7, item: "Link Amiibo", status: "Shipped" },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTradeId, setActiveTradeId] = useState(1);
  const [stage, setStage] = useState<"checkout" | "payment" | "confirmation">("checkout");
  const activeTrade = trades.find(t => t.id === activeTradeId)!;

  const handleNext = () => {
    if (stage === "checkout") setStage("payment");
    else if (stage === "payment") setStage("confirmation");
  };

  return (
    <div className="flex h-screen">
      <aside className={\`transition-all duration-300 bg-white shadow-md border-r h-full \${sidebarOpen ? "w-64" : "w-16"} flex flex-col justify-between\`}>
        <div>
          <div className="flex items-center justify-between px-4 py-3">
            {sidebarOpen && <span className="text-lg font-bold">GroupCart</span>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
          </div>
          <nav className="space-y-4 px-2">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black" title="Account">
              <User size={20} />
              {sidebarOpen && <span>Auth</span>}
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black" title="My Trades">
              <Folder size={20} />
              {sidebarOpen && <span>My Trades</span>}
            </button>
          </nav>
          <div className="mt-4 overflow-y-auto px-2 space-y-2 max-h-[calc(100vh-220px)]">
            {trades.map((trade) => {
              const progress = tradeProgress[trade.status];
              const isActive = trade.id === activeTradeId;
              return (
                <div
                  key={trade.id}
                  onClick={() => {
                    setActiveTradeId(trade.id);
                    setStage("checkout");
                  }}
                  className={\`cursor-pointer p-2 border rounded-md \${isActive ? "border-blue-500 border-2" : "border-gray-300"} hover:bg-gray-50\`}
                >
                  <div className="text-sm font-medium">{trade.item}</div>
                  <div className="h-2 mt-1 w-full bg-gray-200 rounded-full">
                    <div className={\`h-2 rounded-full \${progress.color}\`} style={{ width: progress.width }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{trade.status}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="px-4 py-4 flex items-center justify-center">
          <Info size={18} className="text-gray-400 hover:text-gray-600" />
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">{activeTrade.item}</h2>

        {stage === "checkout" && (
          <div className="space-y-4">
            <p>Step 1: Checkout</p>
            <p>Add your country to calculate shipping and review the listing.</p>
            <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">
              Continue to Payment
            </button>
          </div>
        )}

        {stage === "payment" && (
          <div className="space-y-4">
            <p>Step 2: Payment</p>
            <input placeholder="Full Name" className="border px-3 py-2 w-full rounded" />
            <input placeholder="Address" className="border px-3 py-2 w-full rounded" />
            <input placeholder="Email" className="border px-3 py-2 w-full rounded" />
            <input placeholder="Mobile Number" className="border px-3 py-2 w-full rounded" />
            <button onClick={handleNext} className="bg-green-600 text-white px-4 py-2 rounded">
              Finalize Payment
            </button>
          </div>
        )}

        {stage === "confirmation" && (
          <div className="space-y-4">
            <p className="text-green-600 font-semibold">✓ Order Confirmed</p>
            <p>Thank you for purchasing: <strong>{activeTrade.item}</strong></p>
            <p>We’ve sent a confirmation to your email.</p>
          </div>
        )}
      </main>
    </div>
  );
}
