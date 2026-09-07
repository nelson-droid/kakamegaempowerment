"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SESSION_KEY = "kakamega_admin_session";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

type Filter = "all" | "unread" | "read";

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) {
      router.push("/admin");
      return;
    }
    loadMessages();
  }, [filter, router]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/contact?filter=${filter}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setMessages(data.messages);
      setUnreadCount(data.unreadCount);
      setTotal(data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id: string, isRead: boolean) => {
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead }),
    });
    setMessages(messages.map(m => m.id === id ? { ...m, isRead } : m));
    if (selected?.id === id) setSelected({ ...selected, isRead });
    setUnreadCount(prev => prev + (isRead ? -1 : 1));
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "delete" }),
    });
    setMessages(messages.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
    setTotal(prev => prev - 1);
  };

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.isRead) markRead(msg.id, true);
  };

  const filtered = messages.filter(m => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  const stats = {
    total,
    unread: unreadCount,
    read: total - unreadCount,
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
              </Link>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total", value: stats.total, color: "bg-blue-500", icon: "📊" },
            { label: "Unread", value: stats.unread, color: "bg-orange-500", icon: "✉️" },
            { label: "Read", value: stats.read, color: "bg-green-500", icon: "✅" },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-slate-700">
              <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
                {s.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{s.label} Messages</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, email, subject, or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
            />
            <div className="flex gap-2">
              {(["all", "unread", "read"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-colors ${
                    filter === f
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* List */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="font-bold text-gray-900 dark:text-white">Messages ({filtered.length})</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-slate-700 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">Loading…</div>
              ) : filtered.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  {filter === "unread" ? "No unread messages" : filter === "read" ? "No read messages" : "No messages yet"}
                </div>
              ) : (
                filtered.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => openMessage(m)}
                    className={`w-full text-left px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                      selected?.id === m.id ? "bg-orange-50 dark:bg-orange-900/20" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        {!m.isRead && (
                          <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                        )}
                        <p className={`truncate ${!m.isRead ? "font-bold" : "font-medium"} text-gray-900 dark:text-white`}>
                          {m.name}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{m.subject}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{m.message}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            {selected ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selected.subject}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => markRead(selected.id, !selected.isRead)}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg"
                    >
                      Mark as {selected.isRead ? "Unread" : "Read"}
                    </button>
                    <button
                      onClick={() => deleteMessage(selected.id)}
                      className="px-3 py-1 text-xs bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                      {selected.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{selected.name}</p>
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        {selected.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {selected.message}
                  </p>
                </div>

                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <span>✉️</span> Reply via Email
                </a>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                <div className="text-6xl mb-4">✉️</div>
                <p>Select a message to view its contents</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
