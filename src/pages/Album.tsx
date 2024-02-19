import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Photo } from "../types/Photo";
import { Album as AlbumType } from "../types/Album";
import { api } from "../api";
import { PhotoItem } from "../components/PhotoItem";


export const Album = () => {

    const params = useParams();
    const naavigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Photo[]>([]);
    const [albumInfo, setAlbumInfo] = useState<AlbumType>({id: 0, title: '', userId: 0});

    useEffect(() => {
        if(params.id) {
            loadPhotos(params.id);
            loadAlbumInfo(params.id);
        }
    }, [])

    const loadPhotos = async (id: string) => {
        setLoading(true);
        const photos = await api.getPhotosFromAlbum(id);
        setList(photos);
        setLoading(false);
    }

    const loadAlbumInfo = async (id: string) => {
        const albumInfo = await api.getAlbum(id);
        setAlbumInfo(albumInfo);
    }

    const handleBackButton = () => {
        naavigate(-1);
    }

    return (
        <div>
            <button onClick={handleBackButton}>Voltar</button>

            {loading && "Carregando"}

            <h1>{albumInfo.title}</h1>

            {list.map((item, index) => (
                <PhotoItem 
                    key={index}
                    data={item}
                />
            ))}
        </div>
    )
}