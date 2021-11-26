import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docConfig = new DocumentBuilder()
    .setTitle("Nest-API")
    .setVersion("1.0")
    .build();

  const doc = SwaggerModule.createDocument(app, docConfig);

  SwaggerModule.setup("/docs", app, doc);

  await app.listen(3000);
}
bootstrap();
