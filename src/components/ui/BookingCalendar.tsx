"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, CheckCircle2, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "details" | "success">("calendar");

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const isPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
  };

  const handleDayClick = (day: number) => {
    if (isPast(day)) return;
    setSelectedDate(new Date(year, month, day));
    setSelectedTime(null);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          notes: formData.notes,
          date: selectedDate?.toLocaleDateString(),
          time: selectedTime,
          program: "Discovery Call"
        })
      });
      if (res.ok) {
        setStep("success");
      } else {
        alert("Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <AnimatePresence mode="wait">
        
        {step === "calendar" && (
          <motion.div 
            key="calendar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col lg:flex-row h-full"
          >
            {/* Calendar Section */}
            <div className="flex-1 p-6 lg:p-8 lg:border-r border-[#E7E2D9]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-xl font-medium text-text-dark">
                  {monthNames[month]} {year}
                </h3>
                <div className="flex gap-2">
                  <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-text-muted" />
                  </button>
                  <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-5 h-5 text-text-muted" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-y-4 mb-2 text-center">
                {DAYS_OF_WEEK.map(day => (
                  <div key={day} className="text-xs font-semibold uppercase tracking-wider text-text-muted">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-2 text-center">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const disabled = isPast(day);
                  const selected = isSelected(day);
                  const today = isToday(day);

                  return (
                    <div key={day} className="flex justify-center p-1">
                      <button
                        onClick={() => handleDayClick(day)}
                        disabled={disabled}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                          disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-accent/10 cursor-pointer",
                          selected ? "bg-accent text-white hover:bg-accent hover:shadow-md" : "text-text-dark",
                          today && !selected && "border border-accent text-accent"
                        )}
                      >
                        {day}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Slots Section */}
            <div className="w-full lg:w-[280px] p-6 lg:p-8 bg-[#FDFCFB] flex flex-col h-[400px] lg:h-auto overflow-y-auto">
              <h4 className="font-semibold text-text-dark mb-6">
                {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : "Select a Date"}
              </h4>
              
              {!selectedDate ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-text-muted">
                  <CalendarIcon className="w-10 h-10 mb-3 opacity-20" />
                  <p className="text-sm">Click a date on the calendar to see available times.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 flex-1">
                  {TIME_SLOTS.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-3 px-4 rounded-xl text-sm font-medium transition-all border text-center flex items-center justify-center gap-2",
                        selectedTime === time 
                          ? "bg-accent border-accent text-white shadow-md" 
                          : "bg-white border-[#E7E2D9] text-text-dark hover:border-accent hover:text-accent"
                      )}
                    >
                      {selectedTime === time && <Clock className="w-4 h-4" />}
                      {time}
                    </button>
                  ))}
                  
                  {selectedTime && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-auto pt-6"
                    >
                      <button 
                        onClick={() => setStep("details")}
                        className="w-full bg-[#171310] text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-black transition-colors"
                      >
                        Next Step
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {step === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 p-6 lg:p-10 flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setStep("calendar")}
                className="w-8 h-8 rounded-full border border-[#E7E2D9] flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div>
                <h3 className="font-serif text-2xl text-text-dark">Your Details</h3>
                <p className="text-sm text-text-muted">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
                </p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="flex flex-col flex-1 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-dark">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-text-muted" />
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#FDFCFB] border border-[#E7E2D9] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-dark">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-text-muted" />
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#FDFCFB] border border-[#E7E2D9] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-text-dark">Anything you'd like to share before our call?</label>
                <textarea 
                  rows={4}
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-[#FDFCFB] border border-[#E7E2D9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  placeholder="I'm struggling with..."
                />
              </div>

              <div className="mt-auto pt-6 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:bg-[#b56529] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Scheduling..." : "Schedule Event"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-serif text-text-dark mb-3">You are booked!</h2>
            <p className="text-text-muted mb-8 max-w-md">
              A calendar invitation has been sent to <strong>{formData.email}</strong>. We look forward to speaking with you on {selectedDate?.toLocaleDateString()} at {selectedTime}.
            </p>
            <button 
              onClick={() => {
                setStep("calendar");
                setSelectedDate(null);
                setSelectedTime(null);
                setFormData({ name: "", email: "", phone: "", notes: "" });
              }}
              className="bg-[#F7F4EE] text-text-dark border border-[#E7E2D9] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#EBE7DF] transition-colors"
            >
              Book Another Session
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
