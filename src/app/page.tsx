import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, BookOpen, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-logo-yellow/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-logo-blue rounded-full" /> {/* Placeholder for logo */}
            <span className="text-xl font-bold tracking-tight">초시대 가치 교육</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-logo-blue transition-colors">소개</a>
            <a href="#" className="hover:text-logo-green transition-colors">프로그램</a>
            <a href="#" className="hover:text-logo-orange transition-colors">핵심가치</a>
            <Button className="bg-logo-blue hover:bg-logo-blue/90 text-white rounded-full px-6">
              시작하기
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4 border-logo-blue text-logo-blue rounded-full px-4 py-1">
              TIMELESS VALUES EDUCATION
            </Badge>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              시대를 초월하는 <span className="text-logo-red">영원한 가치</span>,<br />
              부모와 자녀의 <span className="text-logo-green">따뜻한 연결</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              초시대 기술의 파도 속에서도 변치 않는 인성과 가치를 배웁니다. 
              부모와 자녀가 함께 손을 맞잡고 성장하는 가장 소중한 시간.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-logo-orange hover:bg-logo-orange/90 text-white rounded-full px-8 py-6 text-lg">
                자세히 알아보기
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
                교육과정 보기
              </Button>
            </div>
          </div>

          {/* Decorative Elements (Logo Colors) */}
          <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-logo-yellow/10 blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-logo-blue/10 blur-3xl" />
        </section>

        {/* Highlight Section */}
        <section className="bg-white/50 py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Heart, title: "감성 지능", desc: "서로의 마음을 깊이 이해하고 공감하는 능력을 키웁니다.", color: "text-logo-red" },
                { icon: Globe, title: "글로벌 시민", desc: "다양한 가치를 존중하며 더 넓은 세상을 향해 나아갑니다.", color: "text-logo-cyan" },
                { icon: BookOpen, title: "지혜의 독서", desc: "시대를 관통하는 지혜가 담긴 고전을 함께 읽습니다.", color: "text-logo-blue" },
              ].map((item, i) => (
                <Card key={i} className="border-none bg-background shadow-xl shadow-logo-blue/5 hover:shadow-logo-blue/10 transition-shadow rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <item.icon className={`mb-4 h-10 w-10 ${item.color}`} />
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 text-center text-sm text-muted-foreground">
        <p>© 2026 초시대 가치 교육. All rights reserved.</p>
      </footer>
    </div>
  );
}
