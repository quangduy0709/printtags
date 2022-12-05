import { NextPage } from "next";
import type { ReactElement } from "react";
import MainLayout from "./MainLayout";
import SignLayout from "./SignLayout";

export type MainLayout = NextPage & { layout: typeof MainLayout };

export type SignLayout = NextPage & { layout: typeof SignLayout };

export type PageWithLayoutType = MainLayout | SignLayout;

export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

export default PageWithLayoutType;
