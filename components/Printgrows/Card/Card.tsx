import { ReactNode } from 'react';

interface CardProps {
  /**
   * The class name of the container of the card
   */
  className?: string;
  /**
   * Card Content
   */
  children?: ReactNode;
  /**
   * Title Content
   */
  title?: ReactNode;
  /**
   * Title Content
   */
  footer?: ReactNode;
}

const Card = ({ className, children, title, footer }: CardProps) => {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className ? className : ''}`}>
      {title ? <div className="px-4 sm:px-6 py-5 text-base font-semibold border-b">{title}</div> : null}

      {children}

      {footer ? <div className="px-4 sm:px-6 py-5 text-base font-semibold border-t">{footer}</div> : null}
    </div>
  );
};

// eslint-disable-next-line react/display-name
Card.Content = ({ className, children }: CardProps) => {
  return <div className={`px-4 py-5 sm:p-6 ${className ? className : ''}`}>{children}</div>;
};

export default Card;
