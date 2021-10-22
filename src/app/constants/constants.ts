import { NotifierOptions } from 'angular-notifier';

export class Constants {
  // Custom angular notifier options
  public static notifierOptions: NotifierOptions = {
    position: {
      horizontal: {
        position: 'right',
        distance: 12,
      },
      vertical: {
        position: 'top',
        distance: 12,
        gap: 10,
      },
    },
    theme: 'material',
    behaviour: {
      autoHide: 3000,
      onClick: 'hide',
      showDismissButton: true,
      stacking: 4,
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease',
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50,
      },
      shift: {
        speed: 300,
        easing: 'ease',
      },
      overlap: 150,
    },
  };
}
