"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SESSION_KEY = "kakamega_admin_session";

type Story = {
  id: number;
  title: string;
  authorName: string;
  authorRole: string;
  isFeatured: boolean;
  createdAt: string;
};

const SAMPLE_STORIES: Story[] = [
  { id: 1, title: "Wanjiku's Forest Garden Transformation", authorName: "Wanjiku Mwangi", authorRole: "Community Leader, Lurambi", isFeatured: true, createdAt: "2026-08-15" },
  { id: 2, title: "Youth-Led Climate Action at St. Mary's", authorName: "David Otieno", authorRole: "Student Leader", isFeatured: true, createdAt: "2026-08-10" },
  { id: 3, title: "Teachers Become Climate Champions", authorName: "Sarah Nabiswa", authorRole: "Teacher, St. Mary's Primary", isFeatured: false, createdAt: "2026-07-28" },
];

export default function AdminStoriesPage() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>(SAMPLE_STORIES);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    authorRole: "",
    content: "",
    isFeatured: false,
  });

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) router.push("/admin");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory: Story = {
      id: stories.length + 1,
      title: formData.title,
      authorName: formData.authorName,
      authorRole: formData.authorRole,
      isFeatured: formData.isFeatured,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setStories([newStory, ...stories]);
    setFormData({ title: "", authorName: "", authorRole: "", content: "", isFeatured: false });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this story?")) {
      setStories(stories.filter(s => s.id !== id));
    }
  };

  const toggleFeatured = (id: number) => {
    setStories(stories.map(s => s.id === id ? { ...s, isFeatured: !s.isFeatured } : s));
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
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Stories Management</h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors"
            >
              {showForm ? "Cancel" : "+ New Story"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Create New Story</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Author Name</label>
                <input type="text" required value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Author Role</label>
                <input type="text" value={formData.authorRole} onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })} placeholder="e.g. Community Leader" className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Story Content</label>
                <textarea rows={5} required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Featured Story</span>
                </label>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg">Create Story</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold rounded-lg">Cancel</button>
            </div>
          </form>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="font-bold text-gray-900 dark:text-white">All Stories ({stories.length})</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {stories.map((story) => (
              <div key={story.id} className="p-6 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl">
                    📖
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{story.title}</h3>
                      {story.isFeatured && (
                        <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-full">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      By {story.authorName} {story.authorRole && `· ${story.authorRole}`}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{story.createdAt}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleFeatured(story.id)} className="text-amber-600 hover:underline text-sm">
                    {story.isFeatured ? "Unfeature" : "Feature"}
                  </button>
                  <button className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(story.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
