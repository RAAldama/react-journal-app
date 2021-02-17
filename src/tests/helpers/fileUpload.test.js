import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'duvw3qryt', 
    api_key: '245644518411254', 
    api_secret: 'DWfBhSNTeLZnXCZ1kzcUL-UCsCQ' 
});

describe('tests on the fileUpload helper', () => {
    
    test('should upload a file and return an url', async() => {

        const resp = await fetch('https://shop.line-scdn.net/themeshop/v1/products/94/44/af/9444afc5-6890-4d42-94c6-8d6c37c67b0d/16/WEBSTORE/icon_198x278.png');
        const blob = await resp.blob();
        const file = new File([blob], 'photo.png');

        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1].replace('.png','');

        cloudinary.v2.api.delete_resources(imageId);

    })

    test('should return null', async() => {
        const file = new File([], 'photo.png');

        const url = await fileUpload( file );

        expect( url ).toBe(null);
    })
    
})
