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

-   Doc : https://react.dev/reference/react/useEffect
-   Utilisation du useEffect pour faire de la synchronisation.
-   Utilisation de useEffect sans dépendance pour effectuer une synchronisation lors du mount du composant (par exemple attacher un event listener).
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
-   L'utilisation d'une variable dérivé ou l'encapsulation de plusieurs set dans une fonction d'handle peut permet de résoudre ce problème.

## Le hook useMemo

-   Doc : https://react.dev/reference/react/useMemo
-   Même synthaxe que le `useEffect`, un tableau de dépendances. Si aucun dépendance n'est passé, la valeur est retournée une seule fois au moment du `mount` du composant.
-   Permet de retourner une valeur qui va être mémoriser entre plusieurs rendus.
-   Attention à ne pas utiliser `useMemo` à outrance, cela ne sert à rien de mettre en mémoire un traitement qui est rapide.
-   `useId` va générer un id propre à chaque rendu du composant, cela peut-être utilisé pour lier un label et un input.

## Le hook useRef

-   Doc : https://react.dev/reference/react/useRef
-   Syntaxe : `const ref = useRef(null)`
-   React s'occupe d'interagir avec le dom, useRef peut-être une solution pour interagir de manière plus native avec le dom.
-   La variable résultant contient la propriété `current`.
-   La mise à jour d'une ref ne provoque pas de re-render, c'est pour cela qu'une ref ne doit JAMAIS être utilisé dans le tsx/jsx.
-   On peut associer une référence à un élément html via la propriété `ref`.
-   Dans le cadre d'un useEffect, il n'est pas nécessaire d'inclure la ref comme dépendance car elle ne va pas changer (de même pour les set des useStates).
-   Cela revient à faire : `useMemo(() => ({current: null}), [])`
-   Chaque version du composant à sa propre ref.
-   Il n'est pas possible de passer une ref comme une props via le mot ref, on peut utiliser un autre nom de props mais il vaut mieux utiliser le `forwardRef` (cela s'applique que sur nos components, les éléments html standard cela le supporte par défaut).
-   Initialisation à null si cela permet d'interagir avec un élément du dom car c'est la valeur que la ref prendra s'il cette élément n'est plus affiché.
-   Cas d'utilisation :
    -   Dans un timer qui afficherai le contenu d'un input toute les secondes
    -   Interaction avec un élément standard html

## Créer un hook personnalisé

-   Fonction qui contient d'autres hooks.
-   Comme un hook classique, il ne peut être utilisé que dans un composant.
-   Permet d'encapsuler de la logique et de ne pas se répéter.
-   Création de hook sample (voir code)
    -   useToggle
    -   useIncrement
    -   useDocumentTitle
    -   useFetch
-   Hooks :
    -   https://usehooks-ts.com/
    -   https://github.com/streamich/react-use

## Mémoisation et useCallback

-   Doc : https://react.dev/reference/react/memo / https://react.dev/reference/react/useCallback
-   Utilisation de `memo` pour mémoïser un composant.
-   `memo` utilise un peu la même syntaxe que le `forwardRef`, il entoure le composant.
-   Si le composant que l'on essaye de mémoïser prend une props (object, callback) en paramètre qui n'est pas mémoïser, cela ne sert à rien. C'est même contre productif car la mémoïsation est faite pour rien.
-   Pour mémoïser un object passé comme props à notre composant mémoïsé, on utilisera `useMemo`.
-   Pour mémoïser une callback passée comme props à notre composant mémoïsé, on peut utiliser `useMemo` mais `useCallback` est plus adaptée (uniquement car la syntaxe est moins verbeuse).
-   Il est possible de coupler cela avec `useRef` pour avoir une référence qui elle ne change pas et qui permet de s'assurer que la mémoïsation va être correctement utilisée.
-   Ne mémoïser que quand cela est nécessaire, ne pas optimiser en amont alors que cela n'est pas forcement utile.

## Les portails dans React

-   Doc : https://react.dev/reference/react-dom/createPortal
-   Utilisé pour 'téléporter' des object dans le dom
-   Syntaxe : encapsulation du return via `createPortal` qui prend 2 paramètres
    -   noeuds JSX
    -   Element du dom qui existe
-   Spécifique à react-dom

## Capturer les erreurs avec ErrorBoundary

-   Doc : https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
-   React est un ensemble de fonction, donc s'il y a une erreur, elle va être remonté et tout le rendu va être impacté
-   Utilisé un peu comme un try catch
-   npm package : https://github.com/bvaughn/react-error-boundary

# Notions avancées

## Chargement asynchrone via lazy()

-   Doc : https://react.dev/reference/react/lazy
-   Utilisation de la fonction `lazy` pour charger un composant de manière asynchrone au moment de l'import
-   Syntaxe : `const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));`
-   Utilisable uniquement avec des composants qui sont en **export default**
-   Good practice de déclarer les composants lazy au même niveau que l'import des modules (en dehors d'un autre composant)
-   Ce noeud JSX doit être entouré d'une balise `Suspense`, il n'est pas nécessaire que cela soit au même niveau que le composant laze. Cela peut-être dans le composant parent.
-   Utilisation de la props `fallback` dans la balise `Suspense` pour afficher un loader par exemple

## Le hook useReducer

-   Doc : https://react.dev/reference/react/useReducer
-   Utilisé lorsqu'il un objet peut subir de nombreuses actions, par exemple des opérations CRUD sur un objet
-   Synthaxe : `const [state, dispatch] = useReducer(reducer, initialArg, init?)`
-   Le `state` va correspondre au contenu de l'objet
-   Le `dispatch` va permettre faire appel au `reducer` tout en lui passant des arguments supplémentaire nécessaire au `reducer`. La consommation de `dispatch` ne provoque pas de re-render.
-   Le `reducer` contient les actions que l'on peut faire pour modifier le `state`

## Le hook useContext

-   Doc : https://react.dev/reference/react/useContext / https://react.dev/reference/react/createContext
-   Permet d'éviter le `prop drilling`, c'est-à-dire passer une propriété d'élément en élément (par exemple un thème)
-   Doc : https://react.dev/learn/passing-data-deeply-with-context
-   Les éléments mandatory sont : `createContext`, `useContext`, `<MyContext.Provider value={value} /><MyContext />`
-   `createContext` : Permet d'initialiser le context
-   `useContext` : Permet de consommer les informations du context
-   `MyContext.Provider` : Permet aux éléments enfant d'accéder au context et de le modifier
-   Il est important d'isoler le context provider dans une custom hook qui va gérer son propre state, cela permettra d'éviter de re-render tous les éléments enfant dans lequel on a utilisé le state. Dans ce cas, seulement les éléments enfants utilisant le context seront re-render
-   Le re-render dans les éléments est appliqué à chaque fois que l'on modifie le context, donc attention si l'on passe un objet, n'importe quelle maj d'une propriété va lancer un re-render sur tous les éléments utilisant le context même s'il n'utilise pas la propriété modifié du context \
-   On `wrap` généralement le `useContext` dans un custom hook par exemple `useTheme` qui va faire appel au `useContext`
-   Pour ces raisons, les providers sont généralement utiliser dans `main.tsx`
-   S'il y a plusieurs niveaux de `provider` c'est le premier rencontré qui sera appliqué
-   Exemple pertinent : https://react.dev/learn/scaling-up-with-reducer-and-context

## Tester du code React

-   Test via Vitest (https://vitest.dev/) et configuration via vite
-   Utilisation de `renderHook` pour pouvoir utiliser les hooks dans une fonction de test
-   Récupération du retour du hook via la destructuration de `result`
-   Accès à la valeur du résulat via `result.current`
-   Utilisation de la fonction `render` pour pouvoir test un component
-   Création de snapshot via `toMatchInlineSnapshot` qui permet de garder l'état du composant à un moment T.
-   Utilisation de `userEvent` pour pouvoir simuler des actions utilisateurs
-   Utilisation de `expect` pour faire des assertions sur l'état du DOM
-   L'utilisation de composant dans un contexte (router, theme, etc) va ajouter de la difficulté à tester ce composant. Il est alors possible de faire 2 versions du composants une qui va intéragir avec les contextes et qui va ensuite appeler la version du composant dite `pures`. Ces composants pures ne vont dépendre d'aucun contexte et vont prendre en entrée toutes les informations requises. Les tests s'effectueront sur la versions pures du composant.

## Propriétés de rendu

-   Résoudre le problème de personnalisation d'un composant enfant
-   Solution 1 : Utilisation d'une fonction de renderer comme props
-   Solution 2 : Utilisation d'un composant comme props
-   Avantage pour la solution 1 qui permet d'avoir accès aux variables du composant parent la ou la fonction de rendu est définie
