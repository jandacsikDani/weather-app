# React frontend
A frontend a **React** keretrendszer használatával készült.

## Telepítés és indítás
1. Függőségek telpítése
```
npm install
```
2. Fejlesztői szerver indítása
```
npm run dev
```
utána az alkalmazás elérhető lesz alapértelmezetten a `localhost:5173` címen.

## Használat
Az alkalmazás képes a kiválasztott város jelenlegi időjrását, 7 napos előrejelzését és a következő 7 nap legmagasabb hőmérsékletét egy garikonon megjeleníeni.  
A város nevére kattintva pedig kiválasztható a kívánt város. A kiválasztott várost tárolja a böngészőben, amennyiben viszont nincs ilyen akkor indításkor megnyílik a város kereső ablak.

## API
A program az Open Mateo Geocoding és Weather API-ját használja az adatok kinyeréséhez.