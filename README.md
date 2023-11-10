# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Découverte

## La synthaxe JSX

-   Interpolation via `{}`, cela doit être des noeuds react valide, par exemple une string.
-   L'interpolation peut se faire aussi au niveau des className.
-   Pour le style, il faut passer un objet avec les propriétés en camelCase: `{{style: 'red', backgroundColor: 'blue'}}`.
-   La gestion des évènement convention débute par handleClick pour la callback qui se base sur un événement onClick. Cela se fait toujours via la synthax `{}`. Soit l'on passe directement la signature de la fonction dans le `{}`, soit l'on fait appelle à une fonction anonyme.
-   Conditionnement du rendu via un bool en utilisant l'opérateur `&&` ou une ternaire `? : `.

```jsx
{
    myBool && <h1>My title</h1>;
}
```

-   Utilisation de la fonction `map` pour faire du rendu sur des tableaux.
-   Création de composant au sein d'un même fichier ou d'un autre fichier.
-   Ce composant est une fonction qui commence par une majuscule, qui peut être réutilisé sous forme de balise dans le rendu. Il doit rendre un enfant react valide.
-   Il est possible de passer des props via et de les récupérer dans le composant soit via `props` soit via le `destructuring`.
-   Il est possible de ne pas utiliser une balise orpheline pour un composant et de passer du texte par exemple. Cela se récupère via la props `children`.
-   Il est possible d'utiliser le `spread operator` pour passer des props.

```jsx
function App() {
    const myList = ['Item 1', 'Item 2', 'Item 3'];

    return (
        <>
            <Title id="myId" className="myClass" color="blue">
                Mon premier composant
            </Title>
            <ul>
                {myList.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </>
    );
}

function Title({ color, hidden, children, ...props }) {
    if (hidden) {
        return null;
    }

    return (
        <h1 style={{ color: color }} {...props}>
            {children}
        </h1>
    );
}
```

## Le hook useState

-   Création d'un compteur pour utiliser le hook `useState`.
-   Nomenclature de [var, setVar] pour la récupération des valeurs suite à l'initialisation du state.
-   Appeller `setCount` plusieurs fois au sein d'une même callback ne sert pas, cela revient à faire : 0 + 1, 0 + 1, ... Au re-render, on incrémentera que de 1.
-   Utilisation d'une callback dans le setter pour prendre récupérer la 'bonne' valeur de la variable :
    setCount((count) => count + 1).
-   Il est impossible de faire des `mutations` avec des objets ou des arrays dans react. Cela ne provoque pas de re-render.

```jsx
const increment = () => {
    // wrong
    person.age++;
    setPerson(person);

    // good
    setPerson({ ...person, age: person.age + 1 });
};
```

-   les hooks ne peuvent être utilisé dans des conditions ou des boucles ou apres des returns. Il faut conserver l'ordre d'appel.

## Les formulaires avec React

-   Ne pas utilisé les champs contrôlés par react dans le cas des inputs de formulaires. Cela va provoquer un re-render à chaque modification sur l'un des champs (`value` + `onChange`).
-   Les champs contrôlés ne doivent jamais passer en `undefined`, sinon il devient un champ non contrôlé.
-   Utilisation des champs non contrôlés, c'est à dire que l'on garde le comportement classique d'un input, on peut utiliser des `FormData` en prévenant l'event `e.preventDefault()` lors du `onSubmit`.
-   Lors du `FormData` cela est accessible via la fonction `get`.
-   Il est possible d'initialiser le champ via `defaultValue`.
-   Utilisation des champs contrôlés, si nécessité de mettre à jour l'interface lors des modifications dans l'input.
-   Utilisation des champs non contrôlés, si seules les valeurs au moment de la soumission sont utiles.

## Les flux de données dans React

-   Le composant parent peut piloter le composant enfant via les `props`
-   Le composant enfant communique avec le parent via les `callbacks`
-   La communication de l'enfant vers le parent s'appelle le `reverse-data-flow`

# Les bases

## Le hook useEffect

-   Utilisation du useEffect pour faire de la synchronisation
-   Utilisation de useEffect sans dépendance pour effectuer une synchronisation lors du mount du composant (par exemple attacher un event listener)
-   Ne pas oublier de supprimer un tel listener lors du unmount du composant dans le return du useEffect sans dependance

```jsx
useEffect(() => {
    const originalTitle = document.title;
    return () => {
        document.title = originalTitle;
    };
}, []);
```

-   Généralement, si utilisation d'un set depuis un state, au premier niveau du useEffect, il s'agit souvent d'une erreur. Cela génère des re-renders inutiles.
-   L'utilisation d'une variable dérivé ou l'encapsulation de plusieurs set dans une fonction d'handle peut permet de résoudre ce problème

## Le hook useMemo

-   Même synthaxe que le `useEffect`, un tableau de dépendances. Si aucun dépendance n'est passé, la valeur est retournée une seule fois au moment du `mount` du composant
-   Permet de retourner une valeur qui va être mémoriser entre plusieurs rendus
-   Attention à ne pas utiliser `useMemo` à outrance, cela ne sert à rien de mettre en mémoire un traitement qui est rapide
-   `useId` va générer un id propre à chaque rendu du composant, cela peut-être utilisé pour lier un label et un input

## Le hook useRef

-   Syntaxe : `const ref = useRef(null)`
-   React s'occupe d'interagir avec le dom, useRef peut-être une solution pour interagir de manière plus native avec le dom
-   La variable résultant contient la propriété `current`
-   La mise à jour d'une ref ne provoque pas de re-render, c'est pour cela qu'une ref ne doit JAMAIS être utilisé dans le tsx/jsx
-   On peut associer une référence à un élément html via la propriété `ref`
-   Dans le cadre d'un useEffect, il n'est pas nécessaire d'inclure la ref comme dépendance car elle ne va pas changer (de même pour les set des useStates)
-   Cela revient à faire : `useMemo(() => ({current: null}), [])`
-   Chaque version du composant à sa propre ref
-   Il n'est pas possible de passer une ref comme une props via le mot ref, on peut utiliser un autre nom de props mais il vaut mieux utiliser le `forwardRef` (cela s'applique que sur nos components, les éléments html standard cela le supporte par défaut)
-   Initialisation à null si cela permet d'interagir avec un élément du dom car c'est la valeur que la ref prendra s'il cette élément n'est plus affiché
-   Cas d'utilisation :
    -   Dans un timer qui afficherai le contenu d'un input toute les secondes
    -   Interaction avec un élément standard html

## Créer un hook personnalisé

-   Fonction qui contient d'autres hooks
-   Comme un hook classique, il ne peut être utilisé que dans un composant
-   Permet d'encapsuler de la logique et de ne pas se répéter
-   Création de hook sample (voir code)
    -   useToggle
    -   useIncrement
    -   useDocumentTitle
    -   useFetch
-   Hooks :
    -   https://usehooks-ts.com/
    -   https://github.com/streamich/react-use
