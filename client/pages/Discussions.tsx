import { DiscussionBoard } from "@/components/app/DiscussionBoard";

export default function Discussions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Community Discussions</h1>
      <p className="mt-1 text-muted-foreground">Ask questions, help peers, and learn together.</p>
      <div className="mt-6">
        <DiscussionBoard />
      </div>
    </div>
  );
}
