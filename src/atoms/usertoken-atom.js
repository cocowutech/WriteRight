import { atom } from 'recoil';

const localStorageEffect = (key) => ({setSelf, onSet}) => {
    if (typeof window !== 'undefined') {
        // atom (userToken) : undefined
        const savedValue = localStorage.getItem(key);
        // localStorage (userToken) : abc

        if (savedValue != null) {
            // set -> atom (userToken)
            setSelf(JSON.parse(savedValue));
        }

        // if (localStorage (userToken) === undefined)
        onSet((newValue, _, isReset) => {
            isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
        })
    }
}

const userTokenAtom = atom({
    key: 'userToken',
    default: null,
    effects: [
        localStorageEffect('userToken'),
    ]
})

export {
    userTokenAtom
}

