import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Кирпич керамический',
    price: 1200,
    oldPrice: 1400,
    description: 'Высококачественный строительный кирпич',
    category: 'Стеновые материалы',
    image: '/img/705425fa-c1a4-4100-84fe-e9fd02d56e3c.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Цемент М500',
    price: 450,
    description: 'Портландцемент марки М500, мешок 50кг',
    category: 'Сухие смеси',
    image: '/img/2f650151-affa-49b4-a01f-10cd663daa48.jpg',
    inStock: true
  },
  {
    id: 3,
    name: 'Набор инструментов',
    price: 3500,
    description: 'Профессиональный набор строительных инструментов',
    category: 'Инструменты',
    image: '/img/af55420b-6aec-467b-83f7-30afe7ed42f9.jpg',
    inStock: true
  },
  {
    id: 4,
    name: 'Гипсокартон КНАУФ',
    price: 380,
    description: 'Гипсокартонный лист 2500x1200x12,5мм',
    category: 'Стеновые материалы',
    image: '/img/705425fa-c1a4-4100-84fe-e9fd02d56e3c.jpg',
    inStock: true
  },
  {
    id: 5,
    name: 'Шпаклевка финишная',
    price: 520,
    oldPrice: 600,
    description: 'Готовая финишная шпаклевка, 20кг',
    category: 'Сухие смеси',
    image: '/img/2f650151-affa-49b4-a01f-10cd663daa48.jpg',
    inStock: true
  },
  {
    id: 6,
    name: 'Перфоратор Makita',
    price: 8900,
    description: 'Профессиональный перфоратор 800Вт',
    category: 'Инструменты',
    image: '/img/af55420b-6aec-467b-83f7-30afe7ed42f9.jpg',
    inStock: false
  }
];

const categories = ['Все товары', 'Стеновые материалы', 'Сухие смеси', 'Инструменты'];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все товары');

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const filteredProducts = selectedCategory === 'Все товары'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Building2" className="text-accent" size={32} />
              <h1 className="text-2xl font-bold text-primary">РеалБрик</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#catalog" className="text-sm font-medium hover:text-accent transition-colors">Каталог</a>
              <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">О компании</a>
              <a href="#delivery" className="text-sm font-medium hover:text-accent transition-colors">Доставка</a>
              <a href="#contacts" className="text-sm font-medium hover:text-accent transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${cart.length}`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={12} />
                            </Button>
                            <span className="text-sm">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={12} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {cart.length > 0 && (
                      <div className="pt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span>{getTotalPrice()} ₽</span>
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90">
                          Оформить заказ
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Качественные стройматериалы</h2>
          <p className="text-xl mb-8 text-white/90">Широкий ассортимент по доступным ценам</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Смотреть каталог
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Каталог товаров</h2>
          
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-accent hover:bg-accent/90' : ''}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  {product.oldPrice && (
                    <Badge className="absolute top-4 right-4 bg-accent">
                      Скидка
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary">Нет в наличии</Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{product.category}</Badge>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.oldPrice} ₽</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={18} />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">О компании</h2>
              <p className="text-muted-foreground mb-4">
                РеалБрик — ведущий поставщик строительных материалов в регионе. 
                Мы работаем на рынке более 10 лет и предлагаем только качественную продукцию 
                от проверенных производителей.
              </p>
              <p className="text-muted-foreground mb-6">
                Наша миссия — делать строительство доступным и качественным для каждого клиента.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">10+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">5000+</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">1000+</div>
                  <div className="text-sm text-muted-foreground">наименований</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <Icon name="Truck" className="text-accent mb-2" size={32} />
                  <CardTitle className="text-lg">Быстрая доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Доставка по городу в день заказа</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Shield" className="text-accent mb-2" size={32} />
                  <CardTitle className="text-lg">Гарантия качества</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Все товары сертифицированы</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Calculator" className="text-accent mb-2" size={32} />
                  <CardTitle className="text-lg">Онлайн калькулятор</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Рассчитайте нужное количество</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Headphones" className="text-accent mb-2" size={32} />
                  <CardTitle className="text-lg">Консультация</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Поможем с выбором материалов</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Доставка и оплата</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Icon name="MapPin" className="text-accent mb-2" size={32} />
                <CardTitle>Самовывоз</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Бесплатно из нашего склада. Адрес: ул. Строительная, 25</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="Truck" className="text-accent mb-2" size={32} />
                <CardTitle>Доставка по городу</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">От 500 ₽. При заказе от 10 000 ₽ — бесплатно</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="CreditCard" className="text-accent mb-2" size={32} />
                <CardTitle>Способы оплаты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Наличные, банковские карты, безналичный расчет</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer id="contacts" className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Building2" size={32} />
                <h3 className="text-xl font-bold">РеалБрик</h3>
              </div>
              <p className="text-white/80 text-sm">
                Качественные строительные материалы для вашего проекта
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +375 29 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@realbrick.by
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  ул. Строительная, 25
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p>Пн-Пт: 8:00 - 18:00</p>
                <p>Сб: 9:00 - 15:00</p>
                <p>Вс: выходной</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                  <Icon name="MessageCircle" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>© 2024 РеалБрик. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}