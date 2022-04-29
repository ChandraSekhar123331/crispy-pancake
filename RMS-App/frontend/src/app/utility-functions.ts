function increment(object: any, property: string, max?: number) {
    const value = object.get(property)!.value;
    if (!max || value < max) {
        object.get(property)!.setValue(value + 1);
    }
}

function decrement(object: any, property: string, min?: number) {
    const value = object.get(property)!.value;
    if (!min || value > min) {
        object.get(property)!.setValue(value - 1);
    }
}

export { decrement, increment };