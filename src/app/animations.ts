import { animate, trigger, transition, style, state, query, animateChild, group, stagger, keyframes } from "@angular/animations";

export const fadeAnimation = trigger(
  "routeAnimations", [
  transition("* => *", [
    // Style app component with relative to prevent both transitioning pages from conflicting
    style({ position: "relative" }),
    query(":enter, :leave", [
      style({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
      })
    ]),
    // Make old page disappear and new page appear in its place
    query(":enter", [
      style({ opacity: 0 })
    ]),
    query(":leave", animateChild()),
    group([
      query(":leave", [
        animate("50ms ease-in", style({ opacity: 0 }))
      ]),
      query(":enter", [
        animate("350ms ease-in", style({ opacity: 1 }))
      ])
    ]),
  ])
]
);

export const itemAnimation = trigger(
  "itemAnimation", [
  transition(":enter", [
    query(":enter", [
      style({ opacity: 0 }),
      stagger(50, [
        style({ opacity: 1, transform: "scale(0.1)" }),
        animate("100ms ease-in", keyframes([
          style({ transform: "scale(0.3)", offset: 0.2 }),
          style({ transform: "scale(1.5)", offset: 0.8 }),
          style({ transform: "scale(1)", offset: 1 }),
        ]))
      ])
    ]),
  ]),
]
);

export const gridButtonAnimation = trigger(
  "gridButtonAnimation", [
  transition(":enter", [
    query(".grid-button", [
      style({ opacity: 0 }),
      stagger(20, [
        style({ opacity: 1, transform: "scale(0.1)" }),
        animate("50ms ease-in", keyframes([
          style({ transform: "scale(0.3)", offset: 0.2 }),
          style({ transform: "scale(1.2)", offset: 0.8 }),
          style({ transform: "scale(1)", offset: 1 }),
        ]))
      ])
    ]),
  ])
]
);

export const confirmationPopUpAnimation = trigger(
  "confirmationPopUpAnimation", [
    transition(":enter", [
      animate("100ms ease-in-out", keyframes([
        style({transform: "translateY(-8px)", offset: 0.5}),
        style({transform: "*", offset: 1})
      ]))
    ])
  ]
);

export const errorPopUpAnimation = trigger(
  "errorPopUpAnimation", [
    transition(":enter", [
      animate("200ms", keyframes([
        style({transform: "translateX(-8px)", offset: 0.2}),
        style({transform: "translateX(8px)", offset: 0.4}),
        style({transform: "translateX(-8px)", offset: 0.6}),
        style({transform: "translateX(8px)", offset: 0.8}),
        style({transform: "*", offset: 1})
      ]))
    ])
  ]
)