import * as React from "react";

import { cn } from "@/lib/utils";

const lorem15 =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam sequi cumque aut ipsum! Assumenda nemo et perferendis ullam est, deserunt modi reiciendis libero amet tenetur dolor officiis natus doloribus repellendus. Vitae explicabo iusto illo accusamus dolores id dolorem sunt. Cum dolorum eligendi libero odio aperiam harum. Illum atque sit accusamus beatae, magnam reiciendis esse similique corrupti praesentium harum, tempora ex. Iste, quod. Rerum amet impedit nulla cum iusto ut iure aliquid! Itaque accusantium mollitia voluptatibus delectus aspernatur dolorum. Id doloribus aut illum rem deserunt quia alias cum facilis nostrum minus. Officia nemo ullam excepturi ipsa sunt culpa consectetur eligendi mollitia? Veniam id quisquam velit tenetur repellendus aut ullam, saepe quibusdam tempora quod reiciendis cum eligendi explicabo maxime est, quaerat harum? Optio architecto delectus quas repellat corporis aliquam eaque necessitatibus voluptates nobis, minima tempora fuga in ipsam eius modi. Pariatur iste necessitatibus id ipsam nisi iusto laudantium expedita repellendus est assumenda! Nemo a fugiat nihil sint, rerum dolor vel, ab veritatis modi quos dolore placeat quas sed obcaecati, exercitationem corrupti. Laborum illum commodi esse facere aut corrupti quaerat modi id voluptatem! Quaerat animi laboriosam officia ullam iusto, esse facilis omnis reprehenderit. Voluptatem eos quis laboriosam voluptate modi fuga autem officia magni iure aliquid, animi ullam in ratione molestias. Dolores, aspernatur fugit! Natus, omnis. Dolorem eligendi reiciendis atque minima error temporibus, porro, ratione culpa beatae voluptates facere odio voluptatem expedita eaque modi voluptas quisquam autem odit accusantium aut. Quae hic sed dolores? Et illum distinctio consequatur esse voluptate veritatis omnis sapiente quo praesentium modi velit voluptatibus eum, eligendi saepe nulla recusandae placeat doloribus fugiat dolorum officiis quasi quia hic non rerum. Placeat! Quas molestiae ratione ducimus omnis, rem nesciunt impedit harum earum accusantium. Similique quidem nostrum numquam molestiae, itaque vel. Quaerat necessitatibus corrupti at, ratione sunt voluptate sequi est neque eligendi molestiae. Eveniet, vero dolores? Aspernatur, sed! Consequatur hic blanditiis voluptas veniam consequuntur magni, suscipit, placeat esse unde nostrum fugit, omnis nobis corrupti facere laudantium. Obcaecati omnis maiores veritatis ducimus eveniet et. Illum consequatur veritatis molestiae deserunt amet, aliquam non a fugit cumque, reprehenderit autem numquam, ea fuga. Iusto cum, dignissimos qui expedita vitae pariatur blanditiis explicabo? Eum sed veritatis aliquam animi. Dicta dolorem praesentium animi quaerat assumenda obcaecati, placeat, quisquam fugit impedit reiciendis ratione accusamus commodi laboriosam voluptatum reprehenderit autem facere ad perspiciatis veniam minus? Ut illum labore quod natus soluta. Quae omnis quam repellat! Odit nihil libero, tenetur quas, deleniti sequi animi cupiditate reprehenderit, tempora neque possimus maiores voluptatibus facere non doloremque delectus. Quo facilis id nesciunt omnis accusantium consequatur. Optio ratione, temporibus qui distinctio pariatur eligendi. Ipsa, sint eveniet eum assumenda, mollitia dolor ea, sit quibusdam ratione itaque atque nam obcaecati tempore. Perspiciatis eaque quas aperiam laudantium, dolores eos";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
