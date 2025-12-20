import PhoneScreen from "./components/PhoneScreen";

type HomeProps = {
  searchParams?: Promise<{ family?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const familyId = (params?.family ?? "default").toLowerCase();
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-5 left-5 text-6xl opacity-10 animate-float"
          style={{ animationDelay: "0s" }}
        >
          🎄
        </div>
        <div
          className="absolute top-5 right-5 text-5xl opacity-10 animate-float"
          style={{ animationDelay: "1s" }}
        >
          ⭐
        </div>
        <div
          className="absolute bottom-5 left-5 text-5xl opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        >
          🎁
        </div>
        <div
          className="absolute bottom-5 right-5 text-6xl opacity-10 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          ❄️
        </div>
      </div>
      <PhoneScreen familyId={familyId} />
    </main>
  );
}
