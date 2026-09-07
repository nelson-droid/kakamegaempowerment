"use client";

import { useState } from "react";
import { Navigation, Footer } from "@/components/ui";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "tree-planting" | "workshop" | "cleanup" | "meeting" | "training" | "youth";
  spots: number;
  registered: number;
  description: string;
  image: string;
};

const EVENTS: Event[] = [
  {
    id: 1,
    title: "Community Tree Planting Day",
    date: "2026-09-15",
    time: "8:00 AM - 2:00 PM",
    location: "Lurambi Primary School",
    type: "tree-planting",
    spots: 150,
    registered: 87,
    description: "Join us for our monthly community tree planting event. We'll be planting indigenous trees in the Lurambi area. All ages welcome! Tools and refreshments provided.",
    image: "🌳",
  },
  {
    id: 2,
    title: "Youth Climate Action Workshop",
    date: "2026-09-22",
    time: "9:00 AM - 4:00 PM",
    location: "Kakamega Town Hall",
    type: "youth",
    spots: 50,
    registered: 34,
    description: "A hands-on workshop for young people aged 15-25. Learn about climate change, environmental advocacy, and how to take action in your community.",
    image: "🎯",
  },
  {
    id: 3,
    title: "School Environmental Club Training",
    date: "2026-10-05",
    time: "10:00 AM - 3:00 PM",
    location: "Mahiakalo Secondary School",
    type: "training",
    spots: 40,
    registered: 28,
    description: "Training session for teachers and students leading environmental clubs. Learn how to start and run successful school greening programs.",
    image: "🏫",
  },
  {
    id: 4,
    title: "River Cleanup Campaign",
    date: "2026-10-12",
    time: "7:00 AM - 12:00 PM",
    location: "Kakamega River Banks",
    type: "cleanup",
    spots: 100,
    registered: 45,
    description: "Monthly river cleanup to protect our waterways. Gloves, bags, and safety equipment provided. Let's keep Kakamega's rivers clean!",
    image: "🌊",
  },
  {
    id: 5,
    title: "Moringa Cultivation Workshop",
    date: "2026-10-19",
    time: "9:00 AM - 1:00 PM",
    location: "Shinyalu Community Center",
    type: "workshop",
    spots: 30,
    registered: 19,
    description: "Learn about the benefits and cultivation of Moringa trees. Perfect for farmers and community gardeners looking to add this superfood to their land.",
    image: "🌿",
  },
  {
    id: 6,
    title: "Community Leaders Meeting",
    date: "2026-10-26",
    time: "2:00 PM - 5:00 PM",
    location: "Kakamega Central Office",
    type: "meeting",
    spots: 25,
    registered: 18,
    description: "Quarterly meeting for community leaders and project coordinators. Discuss progress, challenges, and plans for the next quarter.",
    image: "👥",
  },
  {
    id: 7,
    title: "World Food Day: Food Forest Tour",
    date: "2026-11-01",
    time: "9:00 AM - 3:00 PM",
    location: "Various School Sites",
    type: "tree-planting",
    spots: 40,
    registered: 22,
    description: "Celebrate World Food Day by visiting school food forests and learning about sustainable food production through agroforestry.",
    image: "🥭",
  },
  {
    id: 8,
    title: "Waste Management Training",
    date: "2026-11-08",
    time: "10:00 AM - 4:00 PM",
    location: "Malava Community Hall",
    type: "training",
    spots: 35,
    registered: 15,
    description: "Learn about waste segregation, recycling, and composting. Help reduce waste in your community through practical techniques.",
    image: "♻️",
  },
];

const EVENT_TYPES = [
  { value: "all", label: "All Events", color: "bg-gray-600" },
  { value: "tree-planting", label: "Tree Planting", color: "bg-green-600" },
  { value: "workshop", label: "Workshops", color: "bg-blue-600" },
  { value: "cleanup", label: "Cleanups", color: "bg-cyan-600" },
  { value: "meeting", label: "Meetings", color: "bg-purple-600" },
  { value: "training", label: "Training", color: "bg-amber-600" },
  { value: "youth", label: "Youth Events", color: "bg-pink-600" },
];

const TYPE_COLORS: Record<string, string> = {
  "tree-planting": "from-green-500 to-emerald-600",
  workshop: "from-blue-500 to-cyan-600",
  cleanup: "from-cyan-500 to-teal-600",
  meeting: "from-purple-500 to-pink-600",
  training: "from-amber-500 to-orange-600",
  youth: "from-pink-500 to-rose-600",
};

const TYPE_ICONS: Record<string, string> = {
  "tree-planting": "🌳",
  workshop: "📚",
  cleanup: "🧹",
  meeting: "🤝",
  training: "🎓",
  youth: "🎯",
};

// Calendar helper functions
const getMonthName = (month: number) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month];
};

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = filter === "all"
    ? EVENTS
    : EVENTS.filter(e => e.type === filter);

  // Get events for selected month
  const eventsThisMonth = EVENTS.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  // Calendar generation
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days: (number | null)[] = [];

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getEventsForDay = (day: number) => {
    return EVENTS.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentMonth &&
             eventDate.getFullYear() === currentYear;
    });
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-KE", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>📅</span>
              <span className="text-white/90 text-sm font-medium">Upcoming Activities</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Events & Activities
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Join our tree planting events, workshops, cleanups, and community activities.
              There's always something happening in Kakamega!
            </p>
          </div>
        </section>

      {/* Calendar Section */}
      <section className="py-8 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar */}
            <div className="flex-1">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {getMonthName(currentMonth)} {currentYear}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={prevMonth}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 py-2"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Calendar days */}
                  {days.map((day, idx) => {
                    const dayEvents = day ? getEventsForDay(day) : [];
                    const isToday = day &&
                      today.getDate() === day &&
                      today.getMonth() === currentMonth &&
                      today.getFullYear() === currentYear;

                    return (
                      <div
                        key={idx}
                        className={`min-h-[60px] p-1 border rounded-lg ${
                          day
                            ? "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                            : "bg-gray-50 dark:bg-slate-900 border-transparent"
                        }`}
                      >
                        {day && (
                          <>
                            <div className={`text-sm font-medium mb-1 ${
                              isToday
                                ? "text-green-700 dark:text-green-400"
                                : "text-gray-700 dark:text-gray-300"
                            }`}>
                              {isToday ? `● ${day}` : day}
                            </div>
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={`text-xs p-1 rounded bg-gradient-to-r ${TYPE_COLORS[event.type]} text-white truncate cursor-pointer hover:opacity-80`}
                              >
                                {TYPE_ICONS[event.type]} {event.title.split(" ")[0]}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500 mt-1">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upcoming Events Sidebar */}
            <div className="lg:w-80">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Upcoming This Month
              </h3>
              <div className="space-y-3">
                {eventsThisMonth
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((event) => {
                    const progress = (event.registered / event.spots) * 100;
                    return (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow cursor-pointer hover:shadow-md transition-shadow border border-gray-100 dark:border-slate-700"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${TYPE_COLORS[event.type]} flex items-center justify-center text-lg`}>
                            {TYPE_ICONS[event.type]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                              {event.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(event.date)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>{event.registered}/{event.spots} registered</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${TYPE_COLORS[event.type]} rounded-full`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {eventsThisMonth.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No events scheduled this month.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & All Events */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter:</span>
            {EVENT_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === type.value
                    ? `${type.color} text-white`
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const progress = (event.registered / event.spots) * 100;
              const isFull = event.registered >= event.spots;
              const eventDate = new Date(event.date);
              const isPast = eventDate < today;

              return (
                <article
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 dark:border-slate-700 ${
                    isPast ? "opacity-60" : ""
                  }`}
                >
                  {/* Event Header */}
                  <div className={`h-24 bg-gradient-to-br ${TYPE_COLORS[event.type]} flex items-center justify-center relative`}>
                    <span className="text-5xl">{event.image}</span>
                    {isPast && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                        Past Event
                      </span>
                    )}
                    {isFull && !isPast && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                        Full
                      </span>
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${TYPE_COLORS[event.type]} text-white`}>
                        {TYPE_ICONS[event.type]} {EVENT_TYPES.find(t => t.value === event.type)?.label}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>

                    {/* Registration Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-600 dark:text-gray-400">
                          {isFull ? "Event Full" : `${event.registered}/${event.spots} registered`}
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${TYPE_COLORS[event.type]} rounded-full transition-all`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Register Button */}
                    <a
                      href={`mailto:Kakamegaempowerment1@gmail.com?subject=Event Registration: ${event.title}`}
                      onClick={(e) => e.stopPropagation()}
                      className={`mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 font-semibold rounded-lg transition-colors ${
                        isFull || isPast
                          ? "bg-gray-100 dark:bg-slate-700 text-gray-400 cursor-not-allowed"
                          : "bg-green-700 hover:bg-green-800 text-white"
                      }`}
                      onClickCapture={(e) => {
                        if (isFull || isPast) e.preventDefault();
                      }}
                    >
                      {isPast ? "Event Ended" : isFull ? "Join Waitlist" : "Register Now"}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`h-32 bg-gradient-to-br ${TYPE_COLORS[selectedEvent.type]} flex items-center justify-center relative`}>
              <span className="text-6xl">{selectedEvent.image}</span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${TYPE_COLORS[selectedEvent.type]} text-white`}>
                  {TYPE_ICONS[selectedEvent.type]} {EVENT_TYPES.find(t => t.value === selectedEvent.type)?.label}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedEvent.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedEvent.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {/* Registration */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    {selectedEvent.registered}/{selectedEvent.spots} registered
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {Math.round((selectedEvent.registered / selectedEvent.spots) * 100)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${TYPE_COLORS[selectedEvent.type]} rounded-full`}
                    style={{ width: `${(selectedEvent.registered / selectedEvent.spots) * 100}%` }}
                  />
                </div>
              </div>

              <a
                href={`mailto:Kakamegaempowerment1@gmail.com?subject=Event Registration: ${selectedEvent.title}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg transition-colors"
              >
                📧 Register via Email
              </a>
            </div>
          </div>
        </div>
      )}
      </main>
      <Footer />
    </>
  );
}
