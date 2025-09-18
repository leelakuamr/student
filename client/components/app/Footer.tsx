export function Footer() {
  return (
    <footer className="border-t bg-white/50 dark:bg-background/50">
      <div className="container mx-auto grid gap-4 px-4 py-8 text-sm md:grid-cols-3">
        <div>
          <p className="font-semibold">AdeptLearn</p>
          <p className="text-muted-foreground">Personalized learning for everyone.</p>
        </div>
        <div>
          <p className="font-semibold">Platform</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li><a href="/dashboard" className="hover:text-foreground">Student Dashboard</a></li>
            <li><a href="/instructor" className="hover:text-foreground">Instructor</a></li>
            <li><a href="/admin" className="hover:text-foreground">Admin</a></li>
            <li><a href="/parent" className="hover:text-foreground">Parent Portal</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Resources</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li><a href="/discussions" className="hover:text-foreground">Community</a></li>
            <li><a href="#accessibility" className="hover:text-foreground">Accessibility</a></li>
            <li><a href="#privacy" className="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AdeptLearn. All rights reserved.
      </div>
    </footer>
  );
}
