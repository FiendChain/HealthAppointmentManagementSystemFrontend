import {
    animate,
    style,
    query,
    group,
    AnimationQueryMetadata,
    AnimationGroupMetadata,
} from '@angular/animations';

// get meta data for sliding animations
// NOTE: decorators don't work with functions
// export function getSlideTransitionData(
//     horizontal: boolean, displacement: number, 
//     hideDuration: number = 0.3, showDuration: number = 0.3
// ): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
//     let translateDirection: string = horizontal ? 'translateX' : 'translateY';
//     let transitionData = [
//         group([ // for parallel animations
//             query(':enter, :leave', style({ position: 'fixed', width:'1200px' })
//             , { optional: true }),
//             query(':enter', [
//                 style({ transform: `${translateDirection}(${displacement}%)`, opacity: 0 }),
//                 group([
//                     animate(`${showDuration}s ease-in-out`, style({ transform: `${translateDirection}(0%)` })),
//                     animate(`${showDuration}s`, style({ opacity: 1 })),
//                 ]),
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: `${translateDirection}(0%)`, opacity: 1 }),
//                 group([
//                     animate(`${hideDuration}s ease-in-out`, style({ transform: `${translateDirection}(${-displacement}%)` })),
//                     animate(`${hideDuration}s`, style({ opacity: 0 })),
//                 ]),
//             ], { optional: true }),
//         ])
//     ];
//     return transitionData;
// }

// all transition metadata
export const fadeTransitionData: (AnimationQueryMetadata | AnimationGroupMetadata)[] = [
    query(':enter, :leave', style({ position: 'fixed', width:'1200px' })
    , { optional: true }),
    query(':enter', [   // for entering objects immediately set opacity to 0 for hidden
        style({ opacity: 0 }), 
    ], { optional: true }),
    query(':leave', [
        style({ opacity: 1 }), 
        animate('0.15s', style({ opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
        style({ opacity: 0 }), 
        animate('0.15s', style({ opacity: 1 }))
    ], { optional: true }),
];

export const slideLeftTransitionData = group([ // for parallel animations
    query(':enter, :leave', style({ position: 'fixed', width:'1200px' })
    , { optional: true }),
    query(':enter', [
        style({ transform: `translateX(-100%)`, opacity: 0 }),
        group([
            animate(`0.3s ease-in-out`, style({ transform: `translateX(0%)` })),
            animate(`0.3s`, style({ opacity: 1 })),
        ]),
    ], { optional: true }),
    query(':leave', [
        style({ transform: `translateX(0%)`, opacity: 1 }),
        group([
            animate(`0.3s ease-in-out`, style({ transform: `translateX(100%)` })),
            animate(`0.3s`, style({ opacity: 0 })),
        ]),
    ], { optional: true }),
]);

export const slideRightTransitionData = group([ // for parallel animations
    query(':enter, :leave', style({ position: 'fixed', width:'1200px' })
    , { optional: true }),
    query(':enter', [
        style({ transform: `translateX(100%)`, opacity: 0 }),
        group([
            animate(`0.3s ease-in-out`, style({ transform: `translateX(0%)` })),
            animate(`0.3s`, style({ opacity: 1 })),
        ]),
    ], { optional: true }),
    query(':leave', [
        style({ transform: `translateX(0%)`, opacity: 1 }),
        group([
            animate(`0.3s ease-in-out`, style({ transform: `translateX(-100%)` })),
            animate(`0.3s`, style({ opacity: 0 })),
        ]),
    ], { optional: true }),
]);

export const slideUpTransitionData = group([ // for parallel animations
    query(':enter, :leave', style({ position: 'fixed', width:'1200px' })
    , { optional: true }),
    query(':enter', [
        style({ transform: `translateY(-100%)`, opacity: 0 }),
        group([
            animate(`0.3s ease-in-out`, style({ transform: `translateY(0%)` })),
            animate(`0.3s`, style({ opacity: 1 })),
        ]),
    ], { optional: true }),
    query(':leave', [
        style({ transform: `translateY(0%)`, opacity: 1 }),
        group([
            animate(`0.15s ease-in-out`, style({ transform: `translateY(10%)` })),
            animate(`0.1s`, style({ opacity: 0 })),
        ]),
    ], { optional: true }),
]);

export const slideDownTransitionData = group([ // for parallel animations
    query(':enter, :leave', style({ position: 'fixed', width:'1200px' })
    , { optional: true }),
    query(':enter', [
        style({ transform: `translateY(100%)`, opacity: 0 }),
        group([
            animate(`0.3s ease-in-out`, style({ transform: `translateY(0%)` })),
            animate(`0.3s`, style({ opacity: 1 })),
        ]),
    ], { optional: true }),
    query(':leave', [
        style({ transform: `translateY(0%)`, opacity: 1 }),
        group([
            animate(`0.15s ease-in-out`, style({ transform: `translateY(-10%)` })),
            animate(`0.1s`, style({ opacity: 0 })),
        ]),
    ], { optional: true }),
]);

