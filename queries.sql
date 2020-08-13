-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. 
--   Shows 77 records.
    select p.ProductName, c.CategoryName
    from product as p
    join category as c
    where p.CategoryID = c.ID

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. 
--    Shows 429 records.
    select o.Id, s.CompanyName
    from 'Order' as o
    join Shipper as s
    on o.ShipVia = s.Id
    and o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. 
--    Shows 3 records.
    select p.ProductName, od.Quantity
    from product as p
    join orderdetail as od
    where p.Id = od.ProductId
    and od.OrderId = 10251
    order by p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. 
--    All columns should be labeled clearly. 
--    Displays 16,789 records.
    select o.Id, c.CompanyName, e.LastName
    from 'Order' as o
    join customer as c
    join employee as e
    where o.CustomerId = c.Id
    and o.EmployeeId = e.Id;

-- Displays CategoryName and a new column called Count that shows how many products are in each category. 
--    Shows 8 records.
    select CategoryName, COUNT(CategoryName)
    from Category as c
    join Product as p
    where c.Id = p.CategoryId
    group by CategoryName;


-- Display OrderID and a column called ItemCount that shows the total number of products placed on the order. 
--    Shows 196 records.
    select od.OrderId, sum(od.Quantity) as ItemCount
    from OrderDetail as od
    join 'Order' as o
    where od.OrderId = o.Id
    group by od.OrderId;