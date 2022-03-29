# JavaScript, DOM

## Zadanie 1
Po naciśnięciu na przycisk wyświetl okno dialogowe typu prompt pozwalające ma 
wprowadzenie swojego imienia. Podane imię ma być wstawione do przygotowanej sekcji.

### Moje rozwiązanie
![Zadanie1 - rozwiązanie](/documentation/Lab3/gifs/zad1.gif)

<br>

## Zadanie 2
Przełączanie pomiędzy dwoma zdjęciami. Niech na stronie wyświetlone jest zdjęcie 
z gór w czerwonym obramowaniu. Po naciśnięci przycisku zdjęcie zamieni się na zdjęcie morze 
w niebieskim obramowaniu. Kolejne naciśniecie to ponowny powrót do wersji z górami itp.

### Moje rozwiązanie
![Zadanie2 - rozwiązanie](/documentation/Lab3/gifs/zad2.gif)

<br>

## Zadanie 3
Napisz skrypt, w którym za pomocą 2 przycisków modyfikujesz zawartość listy 
elementów. Jeden przycisk dodaje a drugi usuwa elementy z listy. Niech usuwane będzie 
zawsze pierwszy element listy.

### Moje rozwiązanie
![Zadanie3 - rozwiązanie](/documentation/Lab3/gifs/zad3.gif)

<br>

## Zadanie 4
Napisz skrypt, który dodaje lub usuwa obsługę przycisku testowego. Naciśniecie 
przycisku inkrementuje licznik przyciśnięć. Odpięcie zdarzenia resetuje licznik.

### Moje rozwiązanie 1
![Zadanie4 - rozwiązanie 1](/documentation/Lab3/gifs/zad4-1.gif)

### Moje rozwiązanie 2
![Zadanie4 - rozwiązanie 2](/documentation/Lab3/gifs/zad4-2.gif)

<br>

## Zadanie 5
Stwórz stronę zawierającą 3 elementy np. divy/zdjęcia wypozycjonowane tak jak na 
rysunku poniżej. 

![Zadanie5 - przykład](/documentation/Lab3/images/zad5.jpg)

Niech naciśnięcie któregokolwiek z nich wyświetla odpowiedni komunikat w odpowiedniej 
sekcji na stronie. 
- Żółtego - <q>nacisnąłeś żółty o wartości 5</q>
- Czerwonego – <q>nacisnąłeś czerwony o wartości 2</q>
- Niebieski – <q>nacisnąłeś niebieski o wartości 1</q>

Jeśli suma naciśnietych wartości przekroczy 30 należy wyłączyć możliwość obsługi zdarzenia 
click przez obiekt 2. Jeśli 50 usuwamy dodatkowo obsługę zdarzenia przez obiekt 3. 

Niech na stronie będą jeszcze 2 przyciski: Stop/StartPropagation, Reset . 
Stop/StartPropagation – włącza i wyłącza propagacje (niech tekst na przycisku odpowiada 
stanowi przycisku) 
Reset – wraca do stanu początkowego – rest licznika punktów oraz możliwość obsługi 
zdarzeń typu click.

### Moje rozwiązanie 1
![Zadanie5 - rozwiązanie 1](/documentation/Lab3/gifs/zad5-1.gif)

### Moje rozwiązanie 2
![Zadanie5 - rozwiązanie 2](/documentation/Lab3/gifs/zad5-2.gif)

<br>

## Zadanie 6
Napisz skrypt, w którym za pomocą przycisk Dodaj będzie dodawał nowa pozycje 
do książki telefonicznej (imię, nr telefonu). Dane podajemy za pomocą formularza. Dodawana 
pozycja zawiera również przycisk (w formie ikony – kosz) pozwalający na usuwanie elementy 
z książki adresowej. Wymagana jest walidacja wprowadzanych wartości tak aby numer 
telefonu to były tylko cyfry w formacie 9 cyfr. Imię musi rozpoczynać się od dużej litery i 
zawierać tylko litery (cyfry i inne znaki wykluczone). Przykład poniżej.

![Zadanie6 - przykład](/documentation/Lab3/images/zad5.jpg)

### Moje rozwiązanie
![Zadanie6 - rozwiązanie](/documentation/Lab3/gifs/zad6.gif)

<br>

## Zadanie 7
W katalogu Zadanie 7 znajdziesz plik city.json zawierający kolekcje miast Polski. 

---

Celem ćwiczenia jest weryfikacja umiejętności przetwarzania plików zewnętrznych z wykorzystaniem 
Fetch API. Aby można było przetwarzać pliki zewnętrzne (pliki json-owe) potrzebujemy serwera który 
będzie je hostował. Proponuje użycie json-server. W celu jego zainstalowania potrzeba posiadania 
jakiegoś managera pakietów: npm lub yarn. 

Aby zainstalować JSON Server, należy otworzyć konsolę i wpisać poniższe polecenie: 

`npm install -g json-server`

Aby uruchomić JSON Server, proszę otworzyć wiersz poleceń i wpisać:

`json-server db.json`

W tym momencie serwer udostępnia pliki db.json i będzie można przy użyciu Fetch API przeczytać 
jego zawartość. 

---

Napisz funkcje które: 
a). wyświetli na stronie tylko miasta z województwa małopolskiego 
b). wyświetli miasta które w swojej nazwie posiadają dwa znaki <q>a</q> 
c). wyświetli piąte pod kątem gęstości zaludnienia miasto w Polsce. 
d). dla wszystkich miast powyżej 100000 dodać ( na końcu) city do nazwy. 
e) wyliczyć czy więcej jest miast powyżej 80000 mieszkańców czy poniżej wraz z informacją o 
ich liczbie. 
f). jaka jest średnia powierzchnia miast z powiatów zaczynających się na literkę <q>P</q> 
Wyniki wyświetlić na dedykowanych sekcjach na stronie. 

### Moje rozwiązanie
![Zadanie7 - rozwiązanie](/documentation/Lab3/gifs/zad7.gif)

<br>

## Zadanie 8
Napisz stronę, która wyświetla ikonę balonika (używając emotikonu 🎈). Kiedy 
naciśniesz strzałkę w górę, powinno się napompować (wzrosnąć) o 10 procent, a po 
naciśnięciu strzałki w dół powinno opróżnić się (skurczyć) o 10 procent. Możesz kontrolować 
rozmiar tekstu (emotikony są tekstem), ustawiając właściwość CSS font-size (`style.fontSize`) na 
jego elemencie nadrzędnym. Pamiętaj, aby w wartości uwzględnić jednostkę — na przykład 
piksele (`10px`). Upewnij się, że klawisze <q>strzałka w górę</q> oraz <q>w dół</q> zmieniają tylko rozmiar 
balonika, bez przewijania strony. Przy spuszczaniu powietrza istnieje dolna granica wielkości 
balonika. (chodzi o to aby balonik nie zniknął z ekranu). Kiedy balonik przekroczy ustalony 
rozmiar pęka. W tym przypadku eksplodowanie oznacza, że jest ono zastępowane 
emotikonem 💥. Od tego momentu nie jest możliwe pompowanie lub spuszczanie 
Jeśli na baloniku (i tylko na nim) naciśniesz `Ctrl` i `prawy klawisz myszki` – wywołasz stworzone 
przez Ciebie menu kontekstowe, które powinno wyświetlić informacje na temat aktualnej 
wielkości balonika.

### Moje rozwiązanie
![Zadanie8 - rozwiązanie](/documentation/Lab3/gifs/zad8.gif)

<br>

## Zadanie 9
Napisz slider wizytówek. Wizytówka składa się ze zdjęcia, stanowiska i 
przykładowego opisu. Przyciski `<` i `>` pozwalają na przeglądanie naszych pracowników. 
Dodatkowo istnieje przycisk do losowego wyboru wizytówki do wyświetlenia.

![Zadanie9 - przykład](/documentation/Lab3/images/zad9.jpg)

### Moje rozwiązanie
![Zadanie9 - rozwiązanie](/documentation/Lab3/gifs/zad9.gif)

<br>

## Zadanie 10
### Przetwarzanie plików zewnętrznych 
Mamy trzy pliki typu json. Pliki zawierają kolekcje obiektów opisanych za pomocą kategorii (dostępne 
są kategorie produktów przemysłowych i spożywczych) oraz nazwy konkretnych produktów. W obu 
plikach mogą pojawić się te same kategorie jak również produkty czyli dane mogą się powtarzać. Nie 
jest wymagań aby każda kategoria miała przypisany produkt. Niech lista kategorii liczy przynajmniej 8 
pozycji. 

![Zadanie10 - przykład 1](/documentation/Lab3/images/zad10-1.jpg)

Napisz aplikacyjne która odczyta dane z plików i na ich podstawie wyświetli dane w postaci rozwijalnej 
listy. Elementy na poszczególnych gałęziach nie mogą się powtarzać. 
Pierwszy poziom listy to lista kategorii ( tylko kategorie, które posiadają przynajmniej jeden produkt 
mają być wyświetlane). Drugi poziom to lista produktów (wartości produktów muszą być singletonami) 
Przykładowo wyglądałby to tak jak na zdjęciu poniżej ( podane wartości są tylko przykładowe i w żaden 
sposób nie dotyczą treści zadania)

![Zadanie10 - przykład 2](/documentation/Lab3/images/zad10-2.jpg)

Wybrane elementy listy niech wyświetlają się w sekcji głównej na stronie. W przypadku odznaczenia 
pozycji z listy rozwijalnej dana pozycja znika oczywiście natychmiast z sekcji głównej. Analogicznie jest 
przy zaznaczaniu – dołącza do pozycji w sekcji głównej.

### Moje rozwiązanie
![Zadanie10 - rozwiązanie](/documentation/Lab3/gifs/zad10.gif)

<br>

## Zadanie 11
### Farma Zoombie
Twoim zadaniem jest implementacja gry widocznej na filmie (dołączonym w materiałach) i 
zrzucie ekranu poniżej.

![Zadanie11 - przykład](/documentation/Lab3/images/zad11.jpg)

Poniżej znajdziesz założenia gry i punktację.

### Wersja podstawowa, zawiera (4 punkty) 
- podstawowy mechanizm strzelania do zoombie – strzelamy za pomocą myszki (lewym przyciskiem), 
- zoombie pojawiają się z prawej strony ekranu i poruszają się w stronę lewą,
- zoombie może pojawić się na różnej wysokości ekranu,
- pojawienie się zoombie jest generowane losowo,
- szybkość poruszania jest również generowana losowo w pewnych przedziałach np. 1 – 5, gdzie 1 to 
standardowa szybkość a 5 to tryb turbo,
- wielkość zoombie jest również losowa,
- każdy zestrzelony zoombie to 12 punktów wyświetlanych na ekranie w trybie on-line,
- gra kończy się gdy trójka zoombie dotrze do końca ekranu,
- punktacja statyczna - za każdego zoombie naliczane punkty (jak wyżej), za niecelny strzał ujemne 
punkty (-6pkt).

### Ranking (highscores) (2 punkty) 

- na wstępie gra prosi o podanie nicka (do skutku) - potem ten nick jest wyświetlany nad planszą do 
gry,
- po zakończeniu gry pobieramy zapisane na serwerze wyniki (można do tego celu użyć *highscore json blob*: https://jsonblob.com/_WSTAW_SWOJ_HASH_JSON),
- dodajemy swój wynik, sortujemy, odcinamy pierwsze 7 wyników i zapisujemy znowu na serwerze,
- ranking zawiera pozycję, nicka, ilość punktów i datę wpisu,
- przy prezentacji highscores kursor zmienia się na zwykły, 
- pojawia się guzik umożliwiający powrót do nowej rozgrywki.

### Moje rozwiązanie
![Zadanie11 - rozwiązanie](/documentation/Lab3/gifs/zad11.gif)
