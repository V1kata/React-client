export function MusicDetails({ data }) {
    return (
        <div className="music">
            {data.music.map((val, i) => (
                <div className="group-music">
                    <div className="left">
                        <img src="/images/music-disc-vector_23-2147487256.avif" alt="" />
                    </div>
                    <div className="right">
                        <p>Author: {val.author}</p>
                        <p>Title: {val.title}</p>
                        <a href={val.linkUrl}>Link</a>
                    </div>
                </div>
            ))}
        </div>
    )
}