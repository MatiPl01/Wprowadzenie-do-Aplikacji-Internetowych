# HTML, CSS

## Zadanie 0
Tworzenie elementów responsywnych w sposób natywny. W katalogu zad0 znajdziesz dwie przykładowe strony które należy wykorzystać do wykonania poniższego zadania. 

## 1. Tworzenie strony responsywnej
### Przykład
Przykład użycia media media query, która zwraca ustawienia dla kontekstu strony gdy szerokość okna przeglądarki jest mniejsza lub równa 100px: 

```css
@media (max-width: 100px) { /* CSS Rules */ }
```

A to przykład gdy wysokość okna przeglądarki jest większa lub równa 350px:

```css
@media (min-height: 350px) { /* CSS Rules */ }
```

### Treść zadania
Zmodyfikuj plik **1_MediaQuery.html** taka by po osiągnięciu przez urządzenie na którym wyświetlamy stronę szerokość mniejszej lub równej `800px` tekst w akapitach miał ustawione `font-size` na `10px` oraz kolor czcionki zmienił się na czerwony. 

<br>

### Moje rozwiązanie
![Zadanie0.1 - rozwiązanie](/documentation/Lab2/gifs/zad0-media-query.gif)

## 2. Tworzenie responsywnego zdjęcia
### Przykład
Aby stworzy zdjęcie responsywne należy ustawić mu następujące ustawienia.

```css
img { 
  max-width: 100%; 
  display: block; 
  height: auto; 
}
```

### Treść zadania
Zmodyfikuj plik **2_ResponsywnyImage.html** tak, aby znajdujące się tam zdjęcie stało się responsywne. Sprawdź, jake efekty uzyskasz.

<br>

### Moje rozwiązanie
![Zadanie0.2 - rozwiązanie](/documentation/Lab2/gifs/zad0-responsive-image.gif)

<br><br>

## Zadanie 1
Stwórz szablon strony taki jak na rysunku poniższym (możesz wykorzystać szablon jaki tworzyłeś/aś w lab1.) Następnie, wykorzystując style warunkowe, pozwól aby przy zmianie rozdzielczości układ 3-kolumnowy zmienił się na układ 2-kolumny (kolumna prawa ma być przesunięta poniżej), a następnie w układ 1-kolumnowy. Przy układzie jednokolumnowym powinno zniknąć logo z sekcji nagłówkowej.

### Przykład
![Zadanie1 - przykład](/documentation/Lab2/images/zad1.jpg)

<br>

### Moje rozwiązanie
![Zadanie1 - rozwiązanie](/documentation/Lab2/gifs/zad1.gif)

<br><br>

## Zadanie 2
Jedną z najważniejszych właściwości w CSS jest FlexBox. Używając tej właściwości, napisz style do strony **index.html** z katalogu **zdanie 2** tak, aby wyglądała jak poniżej:

### Przykład
### 1) 
![Zadanie2 - przykład 1](/documentation/Lab2/images/zad2-1.jpg)

### 2) 
![Zadanie2 - przykład 2](/documentation/Lab2/images/zad2-2.jpg)

<br>

### Moje rozwiązanie
![Zadanie2 - rozwiązanie](/documentation/Lab2/gifs/zad2.gif)

<br><br>

## Zadanie 3
Na stronie umieść 9 zdjęć o dużej rozdzielności z podpisami. Niech zdjęcia będą umieszczane w trzech kolumnach. Następnie, przy zamianie rozdzielczości, zmieniaj źródła zdjęć na wersje odpowiednie do aktualnej rozdzielczości (niech dla 4 pierwszych zdjęć będą to inne zdjęcia, dla 5 pozostałych te same, co dopasowanych). Zastosuj przynajmniej 4 punkty przejścia. 

*Wskazówka*: Zastosuj atrybut `srcset` do ładowania odpowiedniej wersji zdjęcia.

Pamiętaj, aby poniżej pewnej rozdzielczości, przejść na układ 1 kolumnowy. 

<br>

### Moje rozwiązanie
![Zadanie3 - rozwiązanie](/documentation/Lab2/gifs/zad3.gif)

<br><br>

## Zadanie 4
Zaprojektuj galerię zdjęć miast, gdzie pojedyncze miasto opisane jest tak jak na rysunku poniżej. Stwórz galerię 10 zdjęć i zaprojektuj je tak, aby poprawnie zachowywały się w dowolnej rozdzielczości. Niech każda karta miasta posiada cieniowanie i zaokrąglone narożniki.

### Przykład
![Zadanie4 - przykład](/documentation/Lab2/images/zad4.jpg)

<br>

### Moje rozwiązanie (wersja 1)
![Zadanie4 - rozwiązanie 1](/documentation/Lab2/gifs/zad4-1.gif)

### Moje rozwiązanie (wersja 2)
![Zadanie4 - rozwiązanie 2](/documentation/Lab2/gifs/zad4-2.gif)

<br><br>

## Zadanie 5
Dla dwóch dowolnych zdjęć (przykłady - wiersz górny) zaimplementuj obsługę pseudo klasy `hover` tak, aby zdjęcie, po najechaniu na nie myszką, wyglądało tak jak w wierszu dolnym. Do realizacji efektu wizualnego zastosuj `transition`. 

### Przykład
![Zadanie5 - przykład](/documentation/Lab2/images/zad5.jpg)

<br>

### Moje rozwiązanie
![Zadanie5 - rozwiązanie](/documentation/Lab2/gifs/zad5.gif)

<br><br>

## Zadanie 6
W katalogu **zadanie 6** znajdziesz filmik pokazujący oczekiwany efekt. Wykorzystując **index.html** oraz zdajecie z images, stwórz taki sam efekt. 

*Sugestia*: Wykorzystaj odpowiednie właściwości FlexBox. 

<br>

### Moje rozwiązanie
![Zadanie6 - rozwiązanie](/documentation/Lab2/gifs/zad6.gif)

<br><br>

## Zadanie 7
Stwórz responsywne menu. Przy rozdzielczości powyżej 800px, niech menu będzie w postaci menu poziomego. 

### Przykładowe menu 1:
![Zadanie7 - przykład 1](/documentation/Lab2/images/zad7-1.jpg)

Przy układzie mobilnym menu ma stać się responsywne – w postaci rozsuwanej ikony z pozycjami jak w menu pionowym ( przykład poniżej). 

![Zadanie7 - przykład 1](/documentation/Lab2/images/zad7-2.jpg)

### Przykładowe menu 2:
#### Menu normalne:
![Zadanie7 - przykład 2](/documentation/Lab2/images/zad7-3.jpg)

#### Menu mobilne:
![Zadanie7 - przykład 2](/documentation/Lab2/images/zad7-4.jpg)


#### Rozsunięte menu mobilne:
![Zadanie7 - przykład 2](/documentation/Lab2/images/zad7-5.jpg)

Dodatkowy punkt można zdobyć za efekt animacji przejęcia miedzy ikoną hamburger (trzy/cztery paski poziome) a znakiem X oraz realizację efektu przejścia dla poszczególnych elementów menu w trakcie rozsuwania. 

<br>

### Moje rozwiązanie
![Zadanie7 - rozwiązanie](/documentation/Lab2/gifs/zad7.gif)

<br><br>

## Zadanie 8
Stwórz stronę, na której umieścisz trzy zdjęcia oraz przykładowe teksty, dokładnie tak jak na rysunku wzorcowym poniżej: 

![Zadanie8 - przykład 1](/documentation/Lab2/images/zad8-1.jpg)

Po najechaniu myszką na dowolne zdjęcie, ma ono znaleźć się na pierwszym tle oraz mieć dodatkową obwolutę – tak jak na rysunkach poniżej: 

![Zadanie8 - przykład 2](/documentation/Lab2/images/zad8-2.jpg)

![Zadanie8 - przykład 3](/documentation/Lab2/images/zad8-3.jpg)

Przy zmianie wielkości viewport, strona powinna się tak skomponować, aby była dalej czytelna i przejrzysta. Może to wyglądać np. tak:

![Zadanie8 - przykład 4](/documentation/Lab2/images/zad8-4.jpg)

<br>

### Moje rozwiązanie
![Zadanie8 - rozwiązanie](/documentation/Lab2/gifs/zad8.gif)

<br><br>

## Zadanie 9
## Część 1.
Stwórz dwa menu poziome wyglądające jak poniżej:

![Zadanie9.1 - przykład 1](/documentation/Lab2/images/zad9-1.jpg)

![Zadanie9.1 - przykład 2](/documentation/Lab2/images/zad9-2.jpg)

### Moje rozwiązanie
![Zadanie9.1 - rozwiązanie](/documentation/Lab2/gifs/zad9-1.gif)

<br>

## Część 2.
Następnie jedno z menu umieść na stronie zawierającej przynajmniej 4 sekcje. Sekcja, to może być `div` o wielkości przynajmniej połowy viewport i z umieszczonym w tle jakimś obrazkiem. Menu musi być cały czas dostępne dla użytkownika, nie może znikać nawet podczas przewijania. Przy przewijaniu do innych sekcji niż sekcja rodzica, menu, tło i czcionki powinny zostać wyróżnione – np. zmianą koloru czy wielkości czcionek.

### Moje rozwiązanie
![Zadanie9.2 - rozwiązanie](/documentation/Lab2/gifs/zad9-2.gif)

<br><br>

## Zadanie 10
Zaimplementuj obracającą się kartę wycieczki. Awers karty powinien wyglądać tak jak na rysunku poniżej: 

### Przykład
![Zadanie10 - przykład 1](/documentation/Lab2/images/zad10-1.jpg)

Rewers (aktywowany za pomocą pseudo klasy `hover`) tak, jak pomarańczowa karta poniżej: 

### Przykład
![Zadanie10 - przykład 2](/documentation/Lab2/images/zad10-2.jpg)

Efekt przejścia możesz zobaczyć na filmiku w katalogu zadanie 10. Do realizacji zastosuj: `transition` oraz transformację 3D np. transformację Y. 

<br>

### Moje rozwiązanie
![Zadanie10 - rozwiązanie](/documentation/Lab2/gifs/zad10.gif)

<br><br>

## Zadanie 11
Stwórz menu pionowe, które wygląda i zachowuje się, jak pokazano poniżej: 

### Przed rozwinięciem
![Zadanie11 - przykład 1](/documentation/Lab2/images/zad11-1.jpg)

### Po rozwinięciu
![Zadanie11 - przykład 2](/documentation/Lab2/images/zad11-2.jpg)

### Po najechaniu myszką
![Zadanie11 - przykład 3](/documentation/Lab2/images/zad11-3.jpg)

Rozwiązanie tylko za pomocą **HTML** i **CSS**. <u>Nie używamy</u> **JS**. Proszę zainteresować się pseudo klasą `::after` oraz `::before`. Będę niezbędne do realizacji tego zadania. 

<br>

### Moje rozwiązanie (wersja 1)
![Zadanie11 - rozwiązanie 1](/documentation/Lab2/gifs/zad11-1.gif)

### Moje rozwiązanie (wersja 2)
![Zadanie11 - rozwiązanie 2](/documentation/Lab2/gifs/zad11-2.gif)

<br><br>

## Zadanie 12
Zaprojektuj kartę produktu wyglądającą jak poniżej.

### Przykład
![Zadanie12 - przykład](/documentation/Lab2/images/zad12.jpg)

Niech przy najechaniu na wybrany kolor, zdjęcie wyświetla się z tłem w wybranym kolorze. 
Zdjęcie buta można znaleźć w katalogu **zadanie 12**. Reszta do samodzielnego wykonania. 

### Moje rozwiązanie (wersja 1)
![Zadanie12 - rozwiązanie 1](/documentation/Lab2/gifs/zad12-1.gif)

### Moje rozwiązanie (wersja 2)
![Zadanie12 - rozwiązanie 2](/documentation/Lab2/gifs/zad12-2.gif)

<br><br>

## Zadanie 13
Zaprojektuj szablon strony, który w zależności od wyświetlanego urządzenia będzie wyglądała następująco: 

![Zadanie13 - przykład 1](/documentation/Lab2/images/zad13-1.jpg)

![Zadanie13 - przykład 2](/documentation/Lab2/images/zad13-2.jpg)

Niech sekcja sidebar zawiera Twoją wizytówkę (w postaci elementów leżących jeden pod drugim):
- zdjęcie typu avatar, 
- imię i nazwisko, 
- full stack developer,
- nr telefonu,
- linki do kont w portalach społecznościowych (ikony)

Niech wizytówka zawsze wyświetla się na ekranie – nawet gdy będziemy przewijać całą stronę. W tym celu, sekcja main musi mieć przynajmniej 2 wysokości viewport. Należy ją wypełnić elementami w postaci listy testowych wpisów jak poniżej (np. 5 takich wpisów):

![Zadanie13 - przykład 3](/documentation/Lab2/images/zad13-3.jpg)

oraz formularza rezerwacyjnego jak poniżej:

![Zadanie13 - przykład 4](/documentation/Lab2/images/zad13-4.jpg)

Pozostałe sekcje możesz wypełnić czym i jak chcesz.

Zasady oceniania: 
- 1 pkt – stworzenie responsywnego layoutu,
- 1 pkt - stworzenie panelu bocznego (sidebar) i jego "unieruchomienie",
- 1 pkt – stworzenie listy wpisów wraz ze zdjęciem i efektem otaczania zdjęcia przez tekst,
- 1 pkt – stworzenie formularza

### Moje rozwiązanie*
![Zadanie13 - rozwiązanie](/documentation/Lab2/gifs/zad13.gif)

**\*Uwaga:** Chrome zepsuł mi efekt oblewania zdjęcia przez tekst. W Firefoxie i Edgu nie ma problemów z tym efektem.
