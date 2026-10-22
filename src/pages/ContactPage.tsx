import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner (Matches Screenshot 3) */}
      <section className="bg-gradient-to-b from-[#F9E6EB] to-[#FAF7F8] border-b border-[#EADCE0] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#C83E5B]">اتصل بنا</h1>
          <p className="text-base text-[#4A2E35] font-medium">
            تواصلي مع فريقنا الطبي وخدمة العملاء لأي استفسار عن الباقات أو المنتجات
          </p>
        </div>
      </section>

      {/* Main Two-Column Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Column (Right in RTL) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl font-extrabold text-[#1E1115] mb-6">أرسل لنا رسالة</h2>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E8F8F0] text-[#18794E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1E1115]">
                  تم إرسال رسالتك بنجاح!
                </h3>
                <p className="text-xs sm:text-sm text-[#5E434B] max-w-sm mx-auto leading-relaxed">
                  شكراً لتواصلك معنا يا <strong>{name}</strong>. سيقوم فريق دعم Bella بالرد عليكِ في أقرب وقت ممكن.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold cursor-pointer"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-extrabold text-[#1E1115] mb-1.5">
                    الاسم
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخلي اسمك"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm text-[#1E1115] placeholder:text-[#8C6D76] focus:outline-none focus:border-[#C83E5B] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-extrabold text-[#1E1115] mb-1.5">
                      البريد الإلكتروني
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="أدخلي بريدك الإلكتروني"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm text-[#1E1115] placeholder:text-[#8C6D76] focus:outline-none focus:border-[#C83E5B] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-extrabold text-[#1E1115] mb-1.5">
                      رقم الواتساب (اختياري)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01034548199"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm text-[#1E1115] placeholder:text-[#8C6D76] focus:outline-none focus:border-[#C83E5B] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-extrabold text-[#1E1115] mb-1.5">
                    الرسالة
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتبي رسالتك أو استفسارك هنا..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm text-[#1E1115] placeholder:text-[#8C6D76] focus:outline-none focus:border-[#C83E5B] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Cards & Map Column (Left in RTL) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:+201034548199"
                className="bg-white p-5 rounded-2xl border border-[#EADCE0] hover:border-[#C83E5B] transition-colors space-y-2 block"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C83E5B] text-white flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#6E5058]">الهاتف</p>
                <p dir="ltr" className="text-sm font-extrabold text-[#1E1115] text-right tabular-nums">
                  +20 10 34548199
                </p>
              </a>

              <a
                href="https://wa.me/201034548199"
                target="_blank"
                rel="noreferrer"
                className="bg-white p-5 rounded-2xl border border-[#EADCE0] hover:border-[#C83E5B] transition-colors space-y-2 block"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C83E5B] text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#6E5058]">واتساب</p>
                <p dir="ltr" className="text-sm font-extrabold text-[#1E1115] text-right tabular-nums">
                  01034548199
                </p>
              </a>

              <a
                href="mailto:support@matjarcom.com"
                className="bg-white p-5 rounded-2xl border border-[#EADCE0] hover:border-[#C83E5B] transition-colors space-y-2 block"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C83E5B] text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#6E5058]">البريد الإلكتروني</p>
                <p className="text-sm font-extrabold text-[#1E1115]">support@matjarcom.com</p>
              </a>

              <div className="bg-white p-5 rounded-2xl border border-[#EADCE0] space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#C83E5B] text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#6E5058]">العنوان</p>
                <p className="text-sm font-extrabold text-[#1E1115]">القاهرة، مصر</p>
              </div>
            </div>

            {/* Cairo Location Map Card */}
            <div className="bg-white rounded-3xl border border-[#EADCE0] p-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-sm font-extrabold text-[#1E1115]">موقعنا في القاهرة — مصر</h3>
                  <p className="text-xs text-[#6E5058]">شحن وتوصيل سريع لجميع محافظات الجمهورية</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Cairo,Egypt"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FDF2F4] text-[#C83E5B] text-xs font-extrabold"
                >
                  <span>فتح في الخرائط</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="h-52 rounded-2xl overflow-hidden bg-[#F6EFF1] border border-[#EADCE0] relative">
                <iframe
                  title="خريطة القاهرة"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=31.18%2C29.99%2C31.36%2C30.11&layer=mapnik"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Social Channels Strip */}
            <div className="bg-white rounded-2xl border border-[#EADCE0] p-5 space-y-3">
              <h3 className="text-xs font-extrabold text-[#1E1115]">تابعينا على منصات التواصل</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Facebook', href: 'https://facebook.com' },
                  { label: 'Instagram', href: 'https://instagram.com' },
                  { label: 'TikTok', href: 'https://tiktok.com' },
                  { label: 'WhatsApp', href: 'https://wa.me/201034548199' },
                ].map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#FAF7F8] hover:bg-[#FDF2F4] border border-[#EADCE0] text-xs font-bold text-[#2A181D] hover:text-[#C83E5B] transition-colors"
                  >
                    {soc.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
