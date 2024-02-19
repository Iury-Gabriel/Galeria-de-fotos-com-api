import { useNavigate, useParams } from "react-router-dom"
import { Photo as PhotoType } from "../types/Photo";
import { useEffect, useState } from "react";
import { api } from "../api";


export const Photo = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [photoInfo, setPhotoInfo] = useState<PhotoType>();

    useEffect(() => {
        if(params.id) {
            loadPhoto(params.id);
        }
    }, []);

    const loadPhoto = async (id: string) => {
        setLoading(true);
        const photo = await api.getPhoto(id);
        setPhotoInfo(photo);
        setLoading(false);
    }
    
    const handleBackButton = () => {
        navigate(-1);
    }

    return (
        <div>
            {loading && "Carregando..."}

            {photoInfo && 
                <>
                    <button onClick={handleBackButton}>Voltar</button>
                    <p>{photoInfo.title}</p>
                    <img src={photoInfo.url} alt={photoInfo.title} />
                </>
            }
        </div>
    )
}