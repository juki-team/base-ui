export const SAMPLE_MD_CONTENT1 = `# \\textAlign=center JUKI Markdown Tutorial
---
# 1. Headings
## 1.1. Sizes

- Title H1 \`# Title H1\`
  # Title H1

- Title H2 \`## Title H2\`
  ## Title H2

- Title H3 \`### Title H3\`
  ### Title H3

- Title H4 \`#### Title H4\`
  #### Title H4

- Title H5 \`##### Title H5\`
  ##### Title H5

- Title H6 \`###### Title H6\`
  ###### Title H6

## 1.2. Alignment

- Left alignment \`#### \\textAlign=left Left aligned H4 title\`
  #### \\textAlign=left Left aligned H4 title

- Center alignment \`#### \\textAlign=center Center aligned H4 title\`
  #### \\textAlign=center Center aligned H4 title

- Right alignment \`#### \\textAlign=right Right aligned H4 title\`
  #### \\textAlign=right Right aligned H4 title

> Headings are **left** aligned by default

## 1.3 With links

Anchor (\`#title-id\`) should be unique on the page

Heading with link

## [Title](#title-id)

\`\`\`
##[ Title](#title-id)
\`\`\`

Heading with code and link

## [Title \`some code\`](#title-some-code-id)

\`\`\`
## [Title \`some code\`](#title-some-code-id)
\`\`\`

---

# 2. Paragraphs

- Italic text \`*some ITALIC text*\`

  Lorem *some ITALIC text* ipsum.

- Bold text \`**some BOLD text**\`

  Lorem **some BOLD text** ipsum.

- Italic Bold text \`***some ITALIC BOLD text***\`

  Lorem ***some ITALIC BOLD text*** ipsum.

- Highlight text \`==some HIGHLIGHETD text==\`

  Lorem ==some HIGHLIGHETD text== ipsum.

- Strike text \`~~some STRIKED text~~\`

  Lorem ~~some STRIKED text~~ ipsum.

- Code inline text \`\` \`some CODE INLINE text\` \`\`

  Lorem \`some CODE INLINE text\` ipsum.

- Link text \`[some link text](https://judge.juki.app)\`

  Lorem [some link text](https://judge.juki.app) ipsum.

- Inline math \`$1 \\leq N \\leq 10^5, \\sum_{j=0}^3 j^2, \\int_{x=0}^3 x^2$\`

  Lorem $1 \\leq N \\leq 10^5, \\sum_{j=0}^3 j^2, \\int_{x=0}^3 x^2$ ipsum.

## 2.1 Alignment

- Justify alignment \`\\textAlign=justify\`

  \`\`\`
  \\textAlign=justify
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  \`\`\`

  \\textAlign=justify
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

- Left alignment \`\\textAlign=left\`
  \`\`\`
  \\textAlign=left
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  \`\`\`

  \\textAlign=left
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

- Center alignment \`\\textAlign=center\`

  \`\`\`
  \\textAlign=center
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  \`\`\`
  \\textAlign=center
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

- Right alignment \`\\textAlign=right\`

  \`\`\`
  \\textAlign=right
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  \`\`\`
  \\textAlign=right
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.


> Paragraphs are **justify** aligned by default

---

# [3. Images](#images)

- Normal image \`![Juki with laptop](https://images.juki.pub/o/juki-laptop.svg)\`
  ![Juki with laptop](https://images.juki.pub/o/juki-laptop.svg)

- Linking Images \`[![Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)](https:/judge.juki.app)\`

  [![Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)](https:/judge.juki.app)

## 3.1. Resizing

- Height and width resizing \`![\\size=200x50 Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)\`

  ![\\size=200x50 Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)

- Height resizing \`![\\size=200x Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)\`

  ![\\size=200x Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)

- Width resizing \`![\\size=x50 Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)\`

  ![\\size=x50 Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)

> Images are **auto** size by default

## 3.2. Alignment

- Left alignment \`![\\size=x50\\imgAlign=left Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)\`

  ![\\size=x50\\imgAlign=left Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)

- Center alignment \`![\\size=x50\\imgAlign=center Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)\`

  ![\\size=x50\\imgAlign=center Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)

- Right alignment \`![\\size=x50\\imgAlign=right Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)\`

  ![\\size=x50\\imgAlign=right Juki Judge Banner](https://images.juki.pub/o/juki-judge-blue-bg.png)

> Images are **center** aligned by default

---

# 4. List

### Order List

\`\`\`markdown
1. Item 1
   1. Subitem

      paragraph text
2. Item 2
3. Item3
\`\`\`
Result:

1. Item 1
   1. Subitem

      paragraph text
2. Item 2
3. Item3

### Unorder list

\`\`\`markdown
- Item
- Item
  - Subitem
    - Subsubitem
- Item
\`\`\`
Result:
- Item
- Item
  - Subitem
    - Subsubitem
- Item

---

# 5. Tables

\`\`\`markdown
| Table Head 1 | Table Head 1 |
| - | - |
| Table Cell 1,1 | Table Cell 1,2 |
| Table Cell 2,1 | Table Cell 2,2 |
\`\`\`

Result:

| Table Head 1 | Table Head 1 |
| - | - |
| Table Cell 1,1 | Table Cell 1,2 |
| Table Cell 2,1 | Table Cell 2,2 |

---

# 6. Blockquotes

To create a blockquote, add a > in front of a paragraph.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna

---

# 7. Horizontal Rules

Insert \`---\`

---

---

# 8. Block of Code

\`\`\`\`
\`\`\`CPP
#include <bits/stdc++.h>
int main () {
\tint N = 100000;
\tstd::vector<int> P(N, -1);
\tfor (long long i = 2; i < P.size(); i++) {
\t\tif (P[i] == -1) {
\t\t\tP[i] = i;
\t\t\tfor (long long j = i * i; j < P.size(); j = j + i) {
\t\t\t\tif (P[j] == -1) {
\t\t\t\t\tP[j] = i;
\t\t\t\t}
\t\t\t}
\t\t}
\t}
\treturn 0;
}
\`\`\`
\`\`\`\`

Result:

\`\`\`CPP
#include <bits/stdc++.h>
int main () {
\tint N = 100000;
\tstd::vector<int> P(N, -1);
\tfor (long long i = 2; i < P.size(); i++) {
\t\tif (P[i] == -1) {
\t\t\tP[i] = i;
\t\t\tfor (long long j = i * i; j < P.size(); j = j + i) {
\t\t\t\tif (P[j] == -1) {
\t\t\t\t\tP[j] = i;
\t\t\t\t}
\t\t\t}
\t\t}
\t}
\treturn 0;
}
\`\`\`

With line Numbers add \`\\lineNumbers\` or with a language \`\\lang=CPP\\lineNumbers\`

\`\`\`\`
\`\`\`\\lang=CPP\\lineNumbers
#include <bits/stdc++.h>
int main () {
\tint N = 100000;
\tstd::vector<int> P(N, -1);
\tfor (long long i = 2; i < P.size(); i++) {
\t\tif (P[i] == -1) {
\t\t\tP[i] = i;
\t\t\tfor (long long j = i * i; j < P.size(); j = j + i) {
\t\t\t\tif (P[j] == -1) {
\t\t\t\t\tP[j] = i;
\t\t\t\t}
\t\t\t}
\t\t}
\t}
\treturn 0;
}
\`\`\`
\`\`\`\`

Result:

\`\`\`\\lang=CPP\\lineNumbers
#include <bits/stdc++.h>
int main () {
\tint N = 100000;
\tstd::vector<int> P(N, -1);
\tfor (long long i = 2; i < P.size(); i++) {
\t\tif (P[i] == -1) {
\t\t\tP[i] = i;
\t\t\tfor (long long j = i * i; j < P.size(); j = j + i) {
\t\t\t\tif (P[j] == -1) {
\t\t\t\t\tP[j] = i;
\t\t\t\t}
\t\t\t}
\t\t}
\t}
\treturn 0;
}
\`\`\`

With fixed height on pixels \`\\height=100\`


\`\`\`\`
\`\`\`\\lang=CPP\\lineNumbers\\height=100
#include <bits/stdc++.h>

using namespace std;

int main () {
\tint N = 100000;
\tvector<int> P(N, -1);
\t
\tfor (long long i = 2; i < P.size(); i++) {
\t\tif (P[i] == -1) {
\t\t\tP[i] = i;
\t\t\tfor (long long j = i * i; j < P.size(); j = j + i) {
\t\t\t\tif (P[j] == -1) {
\t\t\t\t\tP[j] = i;
\t\t\t\t}
\t\t\t}
\t\t}
\t}
\t
\tint a = 12345;
\tprintf("%d: ", a);
\tvector<int> primes;

\twhile (a > 1) {
\t\tprimes.push_back(P[a]);
\t\ta = a / P[a];
\t}

\tprintf("No. prime factors %d ", primes.size());
\tfor (int i = 0; i < primes.size(); i++) {
\t\tprintf("%d ", primes[i]);
\t}
\t
\treturn 0;
}
\`\`\`
\`\`\`\`

Result

\`\`\`\\lang=CPP\\lineNumbers\\height=100
#include <bits/stdc++.h>

using namespace std;

int main () {
\tint N = 100000;
\tvector<int> P(N, -1);
\t
\tfor (long long i = 2; i < P.size(); i++) {
\t\tif (P[i] == -1) {
\t\t\tP[i] = i;
\t\t\tfor (long long j = i * i; j < P.size(); j = j + i) {
\t\t\t\tif (P[j] == -1) {
\t\t\t\t\tP[j] = i;
\t\t\t\t}
\t\t\t}
\t\t}
\t}
\t
\tint a = 12345;
\tprintf("%d: ", a);
\tvector<int> primes;

\twhile (a > 1) {
\t\tprimes.push_back(P[a]);
\t\ta = a / P[a];
\t}

\tprintf("No. prime factors %d ", primes.size());
\tfor (int i = 0; i < primes.size(); i++) {
\t\tprintf("%d ", primes[i]);
\t}
\t
\treturn 0;
}
\`\`\`
---

# 9. Math

Block math, some examples:

\`\`\`\\latex\\height=150
$$
1 \\leq N \\leq 10^5
\\\\
\\sum_{j=0}^3 j^2
\\\\
\\int_{x=0}^3 x^2
\\\\
\\Big[\\sum_{k=0}^n e^{k^2}\\Big]
\\\\
\\left\\langle i,2^{2-i}\\right\\rangle
\\\\
\\left.\\frac{df}{dx}\\right|_{x_0}
\\\\
\\begin{array}{rcl}
  0 & \\leftrightarrow &0 \\\\
  1 & \\leftrightarrow &1 \\\\
  2 & \\leftrightarrow &4 \\\\
  \\vdots              &\\vdots
\\end{array}
\\\\
f_n=
\\begin{cases}
  a  &\\text{if $n=0$} \\\\
  r\\cdot f_{n-1} &\\text{else}
\\end{cases}
\\\\
\\begin{pmatrix}
  a  &b \\\\
  c  &d
\\end{pmatrix}
\\\\
\\begin{equation*}
  S=k\\cdot\\lg W
\\end{equation*}
\\\\
f\\colon\\mathbb{R}\\to\\mathbb{R}
\\\\
9.8~\\text{m}/\\text{s}^24
\\\\
\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}
\\\\
\\int x^2\\,dx=x^3/3+C
\\\\
\\nabla=\\boldsymbol{i}\\frac{d}{dx}+\\boldsymbol{j}\\frac{d}{dy}+\\boldsymbol{k}\\frac{d}{dz}
\\\\
\\sigma^2=\\sqrt{\\,\\sum(x_i-\\mu)^2/N}
\\\\
E(X)=\\mu_X=\\sum (x_i-P(x_i))
\\\\
\\frac{1}{\\sqrt{2\\sigma^2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}
$$
\`\`\`
Result:

$$
1 \\leq N \\leq 10^5
\\\\
\\sum_{j=0}^3 j^2
\\\\
\\int_{x=0}^3 x^2
\\\\
\\Big[\\sum_{k=0}^n e^{k^2}\\Big]
\\\\
\\left\\langle i,2^{2-i}\\right\\rangle
\\\\
\\left.\\frac{df}{dx}\\right|_{x_0}
\\\\
\\begin{array}{rcl}
  0 & \\leftrightarrow &0 \\\\
  1 & \\leftrightarrow &1 \\\\
  2 & \\leftrightarrow &4 \\\\
  \\vdots              &\\vdots
\\end{array}
\\\\
f_n=
\\begin{cases}
  a  &\\text{if $n=0$} \\\\
  r\\cdot f_{n-1} &\\text{else}
\\end{cases}
\\\\
\\begin{pmatrix}
  a  &b \\\\
  c  &d
\\end{pmatrix}
\\\\
\\begin{equation*}
  S=k\\cdot\\lg W
\\end{equation*}
\\\\
f\\colon\\mathbb{R}\\to\\mathbb{R}
\\\\
9.8~\\text{m}/\\text{s}^24
\\\\
\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}
\\\\
\\int x^2\\,dx=x^3/3+C
\\\\
\\nabla=\\boldsymbol{i}\\frac{d}{dx}+\\boldsymbol{j}\\frac{d}{dy}+\\boldsymbol{k}\\frac{d}{dz}
\\\\
\\sigma^2=\\sqrt{\\,\\sum(x_i-\\mu)^2/N}
\\\\
E(X)=\\mu_X=\\sum (x_i-P(x_i))
\\\\
\\frac{1}{\\sqrt{2\\sigma^2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}
$$


---

# 9. Embedded files

## 9.1. Pdf documents

\`\`\`
[\\preview=pdf\\height=300](https://prod-v1-utils-back.juki.app/api/v1/note/pdf?sourceUrl=https://files.juki.pub/shared/d9f7c5691647c7b9c35bd3704040f0edf95d33d972d47e89ce09320752e5c45b.md)
\`\`\`

Result:
[\\preview=pdf\\height=300](https://prod-v1-utils-back.juki.app/api/v1/note/pdf?sourceUrl=https://files.juki.pub/shared/d9f7c5691647c7b9c35bd3704040f0edf95d33d972d47e89ce09320752e5c45b.md)

## 9.2. Html documents

\`\`\`
[\\preview=html\\height=500](https://judge.juki.app/problems)
\`\`\`

Result:
[\\preview=html\\height=500](https://judge.juki.app/problems)
`;

export const SAMPLE_MD_CONTENT = `
# Juki Markdown Tutorial

En el ecosistema de Juki utilizamos **Markdown** para redactar textos. Este tutorial cubre todas las características de Markdown soportadas.

> Markdown es un lenguaje de marcado ligero que permite **dar formato a texto** de forma sencilla y legible, usando una sintaxis simple.

## 1. Encabezados

Usa \`#\` para crear encabezados. Cuantos más \`#\`, menor el nivel.

\`\`\`MARKDOWN preview
# Encabezado nivel 1
## Encabezado nivel 2
### Encabezado nivel 3
#### Encabezado nivel 4
##### Encabezado nivel 5
###### Encabezado nivel 6
\`\`\`

**Resultado:**

# Encabezado nivel 1

## Encabezado nivel 2

### Encabezado nivel 3

#### Encabezado nivel 4

##### Encabezado nivel 5

###### Encabezado nivel 6

***

## 2. Énfasis

\`\`\`MARKDOWN
**negrita**
*cursiva*
***negrita cursiva***
~~tachado~~
\`codigo en linea\`
[Texto del enlace](https://judge.juki.app)
$1 \\leq N \\leq 10^5, \\sum_{j=0}^3 j^2, \\int_{x=0}^3 x^2$
\`\`\`

**Resultado:**

**negrita**

*cursiva*

***negrita cursiva***

~~tachado~~

\`codigo en linea\`

[Texto del enlace](https://judge.juki.app)

$1 \\leq N \\leq 10^5, \\sum_{j=0}^3 j^2, \\int_{x=0}^3 x^2$

> Si el enlace comienza con \`#\`, crea un *anchor* (ancla) dentro de la página.  
>
> Este identificador debe ser único para que funcione correctamente.
>
> \`\`\`MARKDOWN
> [Enlace con anchor](#title-id)
> \`\`\`
>
> [Enlace con anchor](#title-id)

***

## 3. Listas

### 3.1 Listas no ordenadas

\`\`\`MARKDOWN
- Elemento A
- Elemento B
  - Sub-elemento B1
  - Sub-elemento B2
\`\`\`

**Resultado:**

* Elemento A

* Elemento B

  * Sub-elemento B1

  * Sub-elemento B2

### 3.2 Listas ordenadas

\`\`\`MARKDOWN
1. Elemento 1
2. Elemento 2
   1. Sub-elemento 2.1
   2. Sub-elemento 2.2
\`\`\`

**Resultado:**

1. Elemento 1
2. Elemento 2

   1. Sub-elemento 2.1
   2. Sub-elemento 2.2

### 3.3 Listas de tareas (checkboxes)

\`\`\`MARKDOWN
- [x] Tarea completada
- [ ] Tarea pendiente
\`\`\`

**Resultado:**

* [x] Tarea completada

* [ ] Tarea pendiente

***

## 5. Imágenes

\`\`\`MARKDOWN
![Texto alternativo](https://images.juki.pub/o/juki-judge-blue-bg.png)
\`\`\`

![0.74](https://images.juki.pub/o/juki-judge-blue-bg.png)

***

## 6. Citas

\`\`\`MARKDOWN
> Esto es una cita.
>
> Se puede tener varias líneas en la misma cita.
\`\`\`

**Resultado:**

> Esto es una cita.
>
> Se puede tener varias líneas en la misma cita.

***

## 7. Bloques de código

\`\`\`\`MARKDOWN
\`\`\`JAVASCRIPT
function saludo() {
  console.log("Hola mundo");
}
\`\`\`
\`\`\`\`

**Resultado:**

\`\`\`JAVASCRIPT
function saludo() {
  console.log("Hola mundo");
}
\`\`\`

***

## 8. Tablas

\`\`\`MARKDOWN
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Fila 1    | Dato 1    | Dato 2    |
| Fila 2    | Dato 3    | Dato 4    |
\`\`\`

**Resultado:**

| Columna 1 | Columna 2 | Columna 3 |
| :-------- | :-------- | :-------- |
| Fila 1    | Dato 1    | Dato 2    |
| Fila 2    | Dato 3    | Dato 4    |

***

## 9. Saltos de línea

* Un salto de línea normal → dejar **una línea vacía**.

* Un salto forzado → agregar **dos espacios** al final de la línea.

* Agregando el tag html \`<br/>\`

<br/>

<img src="https://images.juki.pub/o/juki-judge-blue-bg.png"/>

***

## 10. Líneas horizontales

\`\`\`MARKDOWN
---
\`\`\`

**Resultado:**

***

## 11. Matemáticas

\`\`\`MARKDOWN
$$
1 \\leq N \\leq 10^5
\\\\
\\sum_{j=0}^3 j^2
\\\\
\\int_{x=0}^3 x^2
\\\\
\\Big[\\sum_{k=0}^n e^{k^2}\\Big]
\\\\
\\left\\langle i,2^{2-i}\\right\\rangle
\\\\
\\left.\\frac{df}{dx}\\right|_{x_0}
\\\\
\\begin{array}{rcl}
  0 & \\leftrightarrow &0 \\\\
  1 & \\leftrightarrow &1 \\\\
  2 & \\leftrightarrow &4 \\\\
  \\vdots              &\\vdots
\\end{array}
\\\\
f_n=
\\begin{cases}
  a  &\\text{if $n=0$} \\\\
  r\\cdot f_{n-1} &\\text{else}
\\end{cases}
\\\\
\\begin{pmatrix}
  a  &b \\\\
  c  &d
\\end{pmatrix}
\\\\
\\begin{equation*}
  S=k\\cdot\\lg W
\\end{equation*}
\\\\
f\\colon\\mathbb{R}\\to\\mathbb{R}
\\\\
9.8~\\text{m}/\\text{s}^24
\\\\
\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}
\\\\
\\int x^2\\,dx=x^3/3+C
\\\\
\\nabla=\\boldsymbol{i}\\frac{d}{dx}+\\boldsymbol{j}\\frac{d}{dy}+\\boldsymbol{k}\\frac{d}{dz}
\\\\
\\sigma^2=\\sqrt{\\,\\sum(x_i-\\mu)^2/N}
\\\\
E(X)=\\mu_X=\\sum (x_i-P(x_i))
\\\\
\\frac{1}{\\sqrt{2\\sigma^2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}
$$
\`\`\`

**Resultado:**

$$
1 \\leq N \\leq 10^5
\\\\
\\sum_{j=0}^3 j^2
\\\\
\\int_{x=0}^3 x^2
\\\\
\\Big[\\sum_{k=0}^n e^{k^2}\\Big]
\\\\
\\left\\langle i,2^{2-i}\\right\\rangle
\\\\
\\left.\\frac{df}{dx}\\right|_{x_0}
\\\\
\\begin{array}{rcl}
  0 & \\leftrightarrow &0 \\\\
  1 & \\leftrightarrow &1 \\\\
  2 & \\leftrightarrow &4 \\\\
  \\vdots              &\\vdots
\\end{array}
\\\\
f_n=
\\begin{cases}
  a  &\\text{if $n=0$} \\\\
  r\\cdot f_{n-1} &\\text{else}
\\end{cases}
\\\\
\\begin{pmatrix}
  a  &b \\\\
  c  &d
\\end{pmatrix}
\\\\
\\begin{equation*}
  S=k\\cdot\\lg W
\\end{equation*}
\\\\
f\\colon\\mathbb{R}\\to\\mathbb{R}
\\\\
9.8~\\text{m}/\\text{s}^24
\\\\
\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}
\\\\
\\int x^2\\,dx=x^3/3+C
\\\\
\\nabla=\\boldsymbol{i}\\frac{d}{dx}+\\boldsymbol{j}\\frac{d}{dy}+\\boldsymbol{k}\\frac{d}{dz}
\\\\
\\sigma^2=\\sqrt{\\,\\sum(x_i-\\mu)^2/N}
\\\\
E(X)=\\mu_X=\\sum (x_i-P(x_i))
\\\\
\\frac{1}{\\sqrt{2\\sigma^2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}
$$

<br />

## 12. Diagramas

### 12.1 Mermaid

Mermaid es un lenguaje de diagramación que permite crear gráficos y diagramas de manera sencilla y flexible.

\`\`\`\`MARKDOWN
\`\`\`MERMAID
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\`
\`\`\`\`

**Resultado:**

\`\`\`MERMAID
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\`

### 12.2 Dot con Graphiz

DOT Graphviz es un lenguaje de descripción de gráficos utilizado para crear diagramas y gráficos de forma automatizada. Es un lenguaje de scripting que permite definir la estructura y el diseño de los gráficos mediante un código sencillo y fácil de leer.

\`\`\`\`MARKDOWN
\`\`\`DOT
digraph G {
  A -> B;
  A -> C;
  B -> D;
  C -> D;
}
\`\`\`
\`\`\`\`

**Resultado**

\`\`\`DOT/image
digraph G {
  rankdir=LR;
  nodesep=0.6;
  node [shape=circle, style=filled, fillcolor="white", color="#9ca3af", fontname="Inter"];
  edge [color="#d1d5db", penwidth=1.2];

  // Paso 1: nodo A seleccionado
  A [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  B; C; D;

  A -> B;
  A -> C;
  B -> C;
  B -> D;
  C -> D;
}
---
digraph G {
  rankdir=LR;
  nodesep=0.6;
  node [shape=circle, style=filled, fillcolor="white", color="#9ca3af", fontname="Inter"];
  edge [color="#d1d5db", penwidth=1.2];

  // Paso 2: se marca el arco A->B (A sigue resaltado)
  A [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  B; C; D;

  A -> B [color="#ef4444", penwidth=3];
  A -> C;
  B -> C;
  B -> D;
  C -> D;
}
---
digraph G {
  rankdir=LR;
  nodesep=0.6;
  node [shape=circle, style=filled, fillcolor="white", color="#9ca3af", fontname="Inter"];
  edge [color="#d1d5db", penwidth=1.2];

  // Paso 3: ahora se marca el nodo B (A y A->B permanecen)
  A [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  B [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  C; D;

  A -> B [color="#ef4444", penwidth=3];
  A -> C;
  B -> C;
  B -> D;
  C -> D;
}
---
digraph G {
  rankdir=LR;
  nodesep=0.6;
  node [shape=circle, style=filled, fillcolor="white", color="#9ca3af", fontname="Inter"];
  edge [color="#d1d5db", penwidth=1.2];

  // Paso 4: se marca la arista B->C (ruta A->B->C)
  A [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  B [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  C; D;

  A -> B [color="#ef4444", penwidth=3];
  B -> C [color="#ef4444", penwidth=3];

  A -> C;
  B -> D;
  C -> D;
}
---
digraph G {
  rankdir=LR;
  nodesep=0.6;
  node [shape=circle, style=filled, fillcolor="white", color="#9ca3af", fontname="Inter"];
  edge [color="#d1d5db", penwidth=1.2];

  // Paso 5: nodo C seleccionado
  A [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  B [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  C [fillcolor="#fecaca", color="#ef4444", penwidth=2.5];
  D;

  A -> B [color="#ef4444", penwidth=3];
  B -> C [color="#ef4444", penwidth=3];

  A -> C;
  B -> D;
  C -> D;
}
\`\`\`

## 13. Archivos

### 13.1 Documentos PDF

\`\`\`MARKDOWN
[\\preview=html\\height=500](https://files.juki.pub/problems/ES/P-1000/3-1720756492462.pdf)
\`\`\`

**Resultado:**

[\\preview=html\\height=500](https://files.juki.pub/problems/ES/P-1000/3-1720756492462.pdf)

### 13.2 Paginas HTML

\`\`\`MARKDOWN
[\\preview=html\\height=500](https://judge.juki.app/problems)
\`\`\`

**Resultado:**

[\\preview=html\\height=500](https://judge.juki.app/problems)
`;
