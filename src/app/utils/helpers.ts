// export default class Helpers {
//     static ETHER_ADDRESS: string = "0x0000000000000000000000000000000000000000";
//     static DECIMALS = (10**18);

//     static ether(wei) {
//         if (wei) {
//             return (wei / this.DECIMALS)
//         }
//     }
// }

export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000";
export const DECIMALS = (10**18);

export const RED = 'danger';
export const GREEN = 'success';

export const ether = (wei) => {
    if (wei) {
        return (wei / DECIMALS);
    }
}

export const tokens = ether;