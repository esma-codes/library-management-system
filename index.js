import { db } from './src/prisma/db.ts';

async function kutuphaneyiBaslat() {
    console.log("Kütüphane veritabanına bağlanılıyor...");

    // İlk kitabımızı ekleyelim
    await db.orm.public.Kitap.create({
        ad: "1984",
        yazar: "George Orwell",
        tur: "Distopya"
    });
    
    console.log("Kitap başarıyla kütüphaneye eklendi!");
}

kutuphaneyiBaslat();