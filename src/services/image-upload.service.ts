import { v2 as cloudinary } from 'cloudinary';
import { extractPublicId } from 'cloudinary-build-url'

export class ImageUploadService {
    
    public async uploadImage(image: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'productsChallenge', public_id: `${Date.now()}` },
                    (error, result) => {
                        if (error) {
                            reject(new Error('Error al subir la imagen a Cloudinary'));
                        }
                        resolve(result.secure_url);
                    }
                );
                
                uploadStream.end(image.buffer);
            } catch (error) {
                reject(new Error('El servicio de nube falló al hacer el upload'));
            }
        });
    }

    public async deleteImage(imageUrl: string): Promise<void> {
        try {
            const publicId = this.extractPublicIdFromUrl(imageUrl);
            console.log(imageUrl);
            console.log(publicId);
            if (!publicId) {
                throw new Error('El publicId es necesario para eliminar la imagen');
            }

            const result = await cloudinary.uploader.destroy(publicId);
            
            if (result.result !== 'ok') {
                throw new Error('La eliminación de la imagen en Cloudinary falló');
            }
        } catch (error) {
            throw new Error(`La eliminación de imagen en nube falló: ${error.message}`);
        }
    }

    private extractPublicIdFromUrl(imageUrl: string): string {
        const publicId = extractPublicId(imageUrl)
        return publicId
    }
}