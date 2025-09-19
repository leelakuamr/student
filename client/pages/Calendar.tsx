import React from "react";
import { CalendarWidget } from "@/components/app/CalendarWidget";

function toICSEvent(title: string, dt: Date) {
  const dtstamp = dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return `BEGIN:VEVENT\nUID:${title}-${dt.getTime()}\nDTSTAMP:${dtstamp}\nDTSTART:${dtstamp}\nSUMMARY:${title}\nEND:VEVENT\n`;
}

export default function CalendarPage() {
  const [events, setEvents] = React.useState(() => [] as { title: string; date: Date }[]);

  React.useEffect(() => {
    (async () => {
      const r = await fetch('/api/events');
      if (r.ok) {
        const j = await r.json();
        setEvents((j.events || []).map((e:any)=>({ title: e.title, date: new Date(e.startsAt) })));
      }
    })();
  }, []);

  function exportICS() {
    let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AdeptLearn//EN\n';
    events.forEach((e) => (ics += toICSEvent(e.title, e.date)));
    ics += 'END:VCALENDAR\n';
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adeptlearn_schedule.ics';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Calendar</h1>
      <p className="text-muted-foreground mt-1">View upcoming events and export to your calendar.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <CalendarWidget />
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Export</h3>
          <p className="text-sm text-muted-foreground mt-2">Download events and add them to Google/Apple Calendar.</p>
          <div className="mt-4">
            <button onClick={exportICS} className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Export as .ics</button>
          </div>
        </div>
      </div>
    </div>
  );
}
