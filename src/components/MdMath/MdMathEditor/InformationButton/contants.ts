export const SAMPLE_MD_CONTENT = `# \\textAlign=center JUKI Markdown Tutorial
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

---

# 2. Paragraphs

- Italic text \`*some ITALIC text*\`

  Lorem *some ITALIC text* ipsum.

- Bold text \`**some BOLD text**\`

  Lorem **some BOLD text** ipsum.

- Italic Bold text \`***some ITALIC BOLD text***\`

  Lorem ***some ITALIC BOLD text*** ipsum.

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

# 3. Images

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
`;