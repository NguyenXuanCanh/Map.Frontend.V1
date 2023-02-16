export function toVND(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}