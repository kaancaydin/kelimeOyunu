export interface SoruOzeti {
    soruSayisi: number
    kelime: string
    aciklama: string
    durum: 'dogru' | 'yanlis' | 'pas'
    alinanHarf: number
}

