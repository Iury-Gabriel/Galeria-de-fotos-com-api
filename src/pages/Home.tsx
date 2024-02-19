import { useEffect, useState } from "react"
import { Album } from "../types/Album";
import { api } from "../api";
import { AlbumItem } from "../components/AlbumItem";

export const Home = () => {
    const [loading, setLoading] =  useState(false);
    const [albums, setAlbums] = useState<Album[]>([]);


    useEffect(() => {
        loadAlbums();
    }, []);

    const loadAlbums = async () => {
        setLoading(true);
        const albums = await api.getAlbums();
        setAlbums( albums );
        setLoading(false)
    }

    return (
        <div>
            {loading && "Carregando"}

            {albums.map((item, index) => (
                <AlbumItem 
                    key={index}
                    id={item.id}
                    title={item.title}
                />
            ))}


        </div>
    )
}