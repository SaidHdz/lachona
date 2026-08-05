import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

function getProducts() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData);
}

function saveProducts(products: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
}

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const menudeo = parseFloat(formData.get('menudeo') as string);
    const medio_mayoreo = parseFloat(formData.get('medio_mayoreo') as string);
    const mayoreo = parseFloat(formData.get('mayoreo') as string);
    const unit = formData.get('unit') as string;
    const isPopular = formData.get('isPopular') === 'true';
    
    // Process image file if it exists
    let imageUrl = formData.get('existingImageUrl') as string || '';
    const imageFile = formData.get('image') as File | null;
    
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${id}_${Date.now()}_${imageFile.name}`;
      const imagePath = path.join(process.cwd(), 'public', 'images', filename);
      fs.writeFileSync(imagePath, buffer);
      imageUrl = `/images/${filename}`;
    }

    const newProduct = {
      id,
      name,
      category,
      description,
      prices: {
        menudeo,
        medio_mayoreo,
        mayoreo
      },
      unit,
      imageUrl,
      isPopular
    };

    const products = getProducts();
    const existingIndex = products.findIndex((p: any) => p.id === id);
    
    if (existingIndex >= 0) {
      products[existingIndex] = newProduct;
    } else {
      products.push(newProduct);
    }
    
    saveProducts(products);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json({ success: false, error: "Failed to save product" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const products = getProducts();
    const updatedProducts = products.filter((p: any) => p.id !== id);
    saveProducts(updatedProducts);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
