"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Search,
  ArrowRight,
  BookOpen,
  Users,
  Heart,
  Globe,
  Star,
  GraduationCap,
  CalendarDays,
  Utensils,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen text-foreground selection:bg-edu-yellow selection:text-white overflow-x-hidden">

      {/* Top Header Bar */}
      <div className="hidden lg:block bg-white border-b py-2 px-6">
        <div className="container mx-auto flex justify-between items-center text-xs font-semibold text-muted-foreground/80">
          <div className="flex gap-6">
            <div className="flex items-center gap-1.5 hover:text-edu-teal transition-colors cursor-pointer">
              <Phone className="h-3 w-3" /> 1588-XXXX
            </div>
            <div className="flex items-center gap-1.5 hover:text-edu-teal transition-colors cursor-pointer border-l pl-6">
              <Mail className="h-3 w-3" /> info@tve.edu
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 pr-6 border-r">
              <Facebook className="h-3.5 w-3.5 hover:text-edu-teal cursor-pointer" />
              <Instagram className="h-3.5 w-3.5 hover:text-edu-teal cursor-pointer" />
              <Linkedin className="h-3.5 w-3.5 hover:text-edu-teal cursor-pointer" />
              <Twitter className="h-3.5 w-3.5 hover:text-edu-teal cursor-pointer" />
            </div>
            <div className="flex gap-4">
              <span className="hover:text-edu-teal cursor-pointer">English</span>
              <span className="hover:text-edu-teal cursor-pointer">Login</span>
              <span className="hover:text-edu-teal cursor-pointer">Register</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b-4 border-edu-teal">
        <div className="container mx-auto flex h-24 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-edu-yellow rounded-xl flex items-center justify-center text-white">
              <BookOpen className="h-6 w-6 stroke-[3]" />
            </div>
            <span className="text-3xl font-black tracking-tight text-edu-teal font-serif">Educate</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[15px] font-extrabold uppercase tracking-wide">
            <a href="#" className="text-edu-yellow border-b-2 border-edu-yellow pb-1 font-black">Home</a>
            <a href="#" className="hover:text-edu-yellow transition-colors border-b-2 border-transparent hover:border-edu-yellow pb-1">About</a>
            <a href="#" className="hover:text-edu-yellow transition-colors border-b-2 border-transparent hover:border-edu-yellow pb-1">Programs</a>
            <a href="#" className="hover:text-edu-yellow transition-colors border-b-2 border-transparent hover:border-edu-yellow pb-1">Values</a>
            <a href="#" className="hover:text-edu-yellow transition-colors border-b-2 border-transparent hover:border-edu-yellow pb-1">Contact</a>
            <div className="w-px h-6 bg-border mx-2" />
            <Search className="h-5 w-5 cursor-pointer hover:text-edu-yellow transition-colors" />
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero_kids_studying_1773192555242.png"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay with Tint */}
            <div className="absolute inset-0 bg-edu-dark/50 mix-blend-multiply" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase tracking-tighter"
              >
                PRESCHOOL FOR <br />
                <span className="text-edu-yellow italic font-normal text-handwriting lowercase tracking-normal">Everyone</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/90 text-xl font-medium mb-10 leading-relaxed max-w-xl"
              >
                시대를 초월하는 영원한 가치 교육,<br />
                초시대 가치 교과과정은 기술의 발전 속에서도 변치 않는 지혜를 아이들에게 선물합니다.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button size="lg" className="bg-edu-teal hover:bg-edu-teal/90 text-white rounded-none px-10 py-7 text-lg uppercase font-black tracking-widest border-none shadow-xl">
                  View More <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Hero Navigation Arrows - Decoration */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:block opacity-30 hover:opacity-100 transition-opacity">
            <div className="h-12 w-12 border-2 border-white flex items-center justify-center cursor-pointer">
              <ArrowRight className="h-6 w-6 text-white rotate-180" />
            </div>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:block opacity-30 hover:opacity-100 transition-opacity">
            <div className="h-12 w-12 border-2 border-white flex items-center justify-center cursor-pointer">
              <ArrowRight className="h-6 w-6 text-white" />
            </div>
          </div>
        </section>

        {/* Color Blocks Section */}
        <section className="relative z-20">
          <div className="grid md:grid-cols-3">
            {[
              { title: "PLAYGROUND", color: "bg-edu-yellow", delay: 0 },
              { title: "LEARNING", color: "bg-edu-coral", delay: 0.1 },
              { title: "ENTERTAINMENT", color: "bg-edu-teal", delay: 0.2 }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                className={`${item.color} p-16 text-white group cursor-pointer overflow-hidden relative`}
              >
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-white/80 leading-relaxed mb-10 font-medium">
                  아이들이 스스로 선택하고 활동하며 자신만의 세상을 만들어가는 즐겁고 유익한 공간입니다.
                </p>
                <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm border-b border-white/30 w-fit pb-1 group-hover:gap-4 transition-all">
                  Know More <ArrowRight className="h-4 w-4" />
                </div>
                {/* Decorative Pattern - Fixed background or SVG could go here */}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Icon Grid Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-y-16 gap-x-12">
              {[
                { icon: Star, title: "PLAY TIME", desc: "창의력과 상상력을 자극하는 자유로운 놀이 시간을 제공합니다." },
                { icon: CalendarDays, title: "DAYCARE", desc: "부모님이 안심할 수 있는 안전하고 세심한 일과 관리 서비스입니다." },
                { icon: BookOpen, title: "LEARNING", desc: "본질적인 지혜를 깨우치는 초시대의 가치 교과 로드맵을 따릅니다." },
                { icon: Globe, title: "OUTDOORS", desc: "자연과 소통하며 사회성과 신체 건강을 동시에 키우는 야외 활동입니다." },
                { icon: Utensils, title: "HEALTHY MEALS", desc: "성장기 아이들을 위한 영양 균형이 잡힌 정성스럽고 건강한 식단입니다." },
                { icon: GraduationCap, title: "EVENTS", desc: "꿈과 끼를 발산하고 성취감을 느끼는 다채로운 교육 축제의 장입니다." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="h-20 w-20 flex-shrink-0 bg-edu-yellow/10 rounded-full flex items-center justify-center p-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-full w-full text-edu-yellow stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black mb-3 uppercase tracking-tighter text-edu-dark font-serif">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Banner Section 1 */}
        <section className="py-12 px-6">
          <div className="container mx-auto grid lg:grid-cols-2 gap-0 overflow-hidden border">
            <div className="relative aspect-[16/9] lg:aspect-auto">
              <Image
                src="/images/homeschooling_family_1773192571121.png"
                alt="Feature"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-edu-yellow p-16 md:p-24 flex flex-col justify-center text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1] uppercase tracking-tighter">LEARNING SYSTEM</h2>
              <p className="text-white/90 text-lg md:text-xl font-medium mb-12 leading-relaxed">
                가정에서도 학교에서도 풍성한 학습이 이루어지는 유동적인 교육 시스템을 만나보세요.
                부모님과 자녀가 함께 가치 중심의 삶을 실천하는 방법을 배웁니다.
              </p>
              <Button size="lg" className="bg-edu-teal hover:bg-edu-teal/90 text-white rounded-none w-fit px-12 py-7 font-black tracking-widest uppercase border-none">
                Details
              </Button>
            </div>
          </div>
        </section>

        {/* Info Banner Section 2 */}
        <section className="py-12 px-6 pb-24">
          <div className="container mx-auto grid lg:grid-cols-2 gap-0 overflow-hidden border">
            <div className="bg-edu-teal p-16 md:p-24 flex flex-col justify-center text-white order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1] uppercase tracking-tighter">STEM & VALUES</h2>
              <p className="text-white/90 text-lg md:text-xl font-medium mb-12 leading-relaxed">
                미래 기술 역량인 STEM에 윤리와 가치를 더했습니다.
                인공지능 시대를 이끄는 따뜻한 지성을 가진 글로벌 리더로 성장합니다.
              </p>
              <Button size="lg" className="bg-edu-yellow hover:bg-edu-yellow/90 text-edu-teal rounded-none w-fit px-12 py-7 font-black tracking-widest uppercase border-none">
                More Info
              </Button>
            </div>
            <div className="relative aspect-[16/9] lg:aspect-auto order-1 lg:order-2">
              <Image
                src="/images/school_activity_group_1773192587412.png"
                alt="STEM Activity"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Bottom CTA / Newsletter */}
        <section className="bg-edu-dark py-24 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">JOIN OUR COMMUNITY</h2>
            <p className="text-white/60 text-xl font-medium mb-12">초시대 가치 교육의 최신 소식과 교육 자료를 받아보세요.</p>
            <div className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto border-4 border-edu-teal">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 bg-white text-edu-dark px-8 py-5 text-lg font-bold focus:outline-none placeholder:text-muted-foreground/50 rounded-none uppercase"
              />
              <button className="bg-edu-teal hover:bg-edu-teal/90 text-white px-10 py-5 font-black uppercase tracking-widest transition-colors rounded-none whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white py-12 px-6 border-t font-bold text-sm text-muted-foreground/80 uppercase tracking-widest">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 grayscale">
            <div className="h-6 w-6 bg-edu-teal rounded flex items-center justify-center text-white">
              <BookOpen className="h-4 w-4 stroke-[3]" />
            </div>
            <span className="text-lg font-black tracking-tight text-edu-teal font-serif">Educate</span>
          </div>
          <p>© 2026 AGELESS VALUES EDUCATION. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-edu-yellow cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-edu-yellow cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
