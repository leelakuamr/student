type Props = { src: string; title: string; poster?: string };

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function VideoPlayer({ src, title, poster }: Props) {
  const yt = getYouTubeId(src);
  return (
    <figure className="overflow-hidden rounded-lg border shadow-sm">
      {yt ? (
        <div className="aspect-video w-full bg-black">
          <iframe
            title={title}
            src={`https://www.youtube.com/embed/${yt}?rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <video
          controls
          poster={poster}
          className="aspect-video w-full bg-black"
          aria-label={title}
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      )}
      <figcaption className="p-3 text-sm text-muted-foreground">{title}</figcaption>
    </figure>
  );
}
