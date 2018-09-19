import {
    trigger,
    transition,
} from '@angular/animations';

import { 
    fadeTransitionData, 
    slideUpTransitionData, 
    slideLeftTransitionData, 
    slideRightTransitionData, 
    slideDownTransitionData 
} from './animation-metadata';

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', fadeTransitionData)
]);

export const slideAnimation = trigger('slideAnimation', [
    // transition('workout => scrum', slideLeftTransitionData),
    // transition('scrum => workout', slideRightTransitionData),
    // transition('scrum => scrum-item', slideDownTransitionData),
    // transition('workout => workout-item', slideDownTransitionData),
    transition('* => login', slideLeftTransitionData),
    transition('login => *', slideRightTransitionData),
    transition('register_patient => register_provider', slideRightTransitionData),
    transition('register_provider => register_patient', slideLeftTransitionData),
    transition('* => *', fadeTransitionData)
]);

